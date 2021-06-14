const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 's', 'leave', 'l'],
    cooldown: 0,
    description: 'music bot',
    
    async execute(message, args, cmd, client, Discord) {
        const vc = message.member.voice.channel;
        if(!vc) return message.channel.send('Du musst für diesen Befehl in einem Talk sein!');
        const perms = vc.permissionsFor(message.client.user);
        if(!perms.has('CONNECT')) return message.channel.send('Du verfügst nicht die jeweiligen Rechte!');
        if(!perms.has('SPEAK')) return message.channel.send('Du verfügst nicht die jeweiligen Rechte!');
    
        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send('Du braucht ebenfalls einen Link/ein Video!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };

            } else {
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url };
                } else {
                    message.channel.send('Video konnte nicht gefunden werden!');
                }
            }

            if (!server_queue) {
                const queue_constructer = {
                    voice_channel: vc,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
    
                queue.set(message.guild.id, queue_constructer);
                queue_constructer.songs.push(song);
    
                try {
                    const connection = await vc.join();
                    queue_constructer.connection = connection;
                    video_player(message.guild, queue_constructer.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('Bot konnte nicht verbunden werden');
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`**${song.title}** wurde in die Queue hinzugefügt`);
            }
        }

        else if (cmd === 'skip' || cmd === 's') skip_song(message, server_queue);
        else if (cmd === 'leave' || cmd === 'l') leave_talk(message, server_queue);
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5})
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Gerade wird **${song.title}** abgespielt 🎵`);
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Du musst dich dafür in einem Talk befinden');
    if (!server_queue) {
        return message.channel.send('Es gibt keine weiteren Songs in der Queue');
    }
    server_queue.connection.dispatcher.end();
}

const leave_talk = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Du musst dich dafür in einem Talk befinden');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}