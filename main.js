const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// bot token
client.login('ODI4NjM3ODk0ODEzMTU1Mzk5.YGsfLQ.1NqdWuhBTBiXsSocXVr7_0gHxoQ');
