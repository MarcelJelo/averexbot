module.exports = (Discord, client, message) => {
    const prefix = '&';
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases.includes(cmd));

    try {
        if(command) command.execute(message, args, cmd, client, Discord);
    } catch (err) {
        message.reply('Error bei Befehl');
        console.log(err);
    }
}