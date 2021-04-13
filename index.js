const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const axios = require('axios');
const apiToken = '222031014a21204a1923151091e80d14';
const prefix = '*';
client.mongoose = require('./utils/mongoose.js')

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.on('message', message => {
    const prefix = '*';
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return
    } else {
        const args = message.content.slice(prefix.length).split(/ +/)
        const cmd = args.shift().toLowerCase()
    
        const command = client.commands.get(cmd)
    
        if (command) command.execute(client, message, args, Discord)
    }
})

client.login('ODA0MTEzOTYyMjMxOTIyNzM4.YBHnfA.c0bbWyK4hUAOday85FrYVMq1Fbo');

