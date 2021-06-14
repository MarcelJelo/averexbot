module.exports = (Discord, client) => {
    console.log('Der AverexBot ist online!');

    client.user.setActivity('Prefix -> &', { type: 'WATCHING' });
}