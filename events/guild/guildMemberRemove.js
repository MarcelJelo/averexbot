module.exports = (Discord, client, guildMember) => {
    const channel_id = '854002522536804442';

    guildMember.guild.channels.cache.get(channel_id).send(`**${guildMember.user.tag}** Ist für immer verloren :cry~1: :Averex: :LostTachi: :cry~1:`);
}