module.exports = {
    name: 'hilfe',
    aliases: ['help', 'commands', 'command'],
    descripiton: 'Embeds',
    execute(message, args, cmd, client, Discord) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00B3FF')
        .setTitle('Commands')
        .setDescription('Das sind alle Commands, die alle Mitglieder benutzen können')
        .addFields(
            { name: '&hilfe', value: 'listet alle Commands auf' },
            { name: '&play [SONG]', value: 'spielt einen bestimmten Song ab (Songname oder Link auf YT)' },
            { name: '&skip', value: 'überspringt den jetzigen Song'},
            { name: '&leave', value: 'Bot verlässt den Talk' },
            { name: '&clear [ANZAHL]', value: 'löscht bestimtme Anzahl an Nachrichten (Admin only)' }
        )

        message.channel.send(embed);
    }
}