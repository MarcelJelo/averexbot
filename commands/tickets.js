module.exports = {
    name: 'ticket bot',
    aliases: [],
    permissions: [],
    description: 'creates tickets for support',
    async execute(message, args, cmd, client, Discord) {
        const channel = await message.guild.channels.create(`ticket ${message.author.tag}`);
        channel.setParent('828632140543033386');

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        const reactionMessage = await channel.send('Danke, dass du unseren Support kontaktiert hast!');

        try {
            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");
        } catch(err) {
            channel.send('Der Emoji konnte nicht gesendet werden!');
            throw err;
        }

        const collector = reactionMessage.createReactionCollector((reaction, user) => 
            message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'),
            { dispose: true }
        );

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case "🔒":
                    channel.updateOverwrite(message.author, { SEND_MESSAGE: false});
                    break;
                case "⛔":
                    channel.send('Dieser Kanal wird in ein paar Sekunden wieder gelöscht');
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });

        message.channel.send(`Ein Supporter wird in Kürze bei dir sein! ${channel}`).then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        });
    }
}