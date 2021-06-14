module.exports = {
    name: 'clear',
    aliases: ['c', 'clr'],
    descripiton: 'clears certain amout of messages',
    execute(message, args, cmd, client) {
        let deleteAmount;

        if ((message.member.hasPermission('ADMINISTRATOR'))) {
            if(!args[0]) return message.channel.send('Gebe ebenfalls die Anzahl der Nachrichten ein, die gelöscht werden soll');
            if(isNaN(args[0])) return message.channel.send('Gebe eine echte Zahl ein');
                
            if(args[0] > 99) return message.channel.send('Die Zahl darf nicht größer als 99 sein');
            if(args[0] <= 0) return message.channel.send('Du kannst min. eine Nachricht löschen');
                
            deleteAmount = parseInt(args[0]);
            message.channel.bulkDelete(deleteAmount + 1, true);
        } else {
            message.channel.send('Du verfügst nicht die dazu benötigten Rechte!');
        }
    }
}