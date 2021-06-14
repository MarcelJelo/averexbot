module.exports = (Discord, client, guildMember) => {
    const channel_id = '854002522536804442';

    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Mitglied');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get(channel_id).send(`:Averex: Hallo <@${guildMember.user.id}>, willkommen zum **Averex Community Server** :Averex: :LostTachi: :Flex: :Kaffee:`);
}