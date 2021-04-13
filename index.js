// Discord Bot by Cephalon#4422, BizarreAvatar#8346, and ThinkPuppy#0080
// If you are not one of them, get the fuck off of here.

const Discord = require('discord.js');
const client = new Discord.Client();
client.mongoose = require('./utils/mongoose.js')
require('dotenv').config();

client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.TOKEN);

