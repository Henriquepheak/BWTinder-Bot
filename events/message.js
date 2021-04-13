const Discord = require('discord.js')

module.exports = {
    name: 'message',
    once: false,
    execute(message, client) {
        const prefix = '*';
        if (!message.content.startsWith(prefix) || message.author.bot) {
            return
        } else {
            const args = message.content.slice(prefix.length).split(/ +/)
            const cmd = args.shift().toLowerCase()
        
            const command = client.commands.get(cmd)
        
            if (command) command.execute(client, message, args, Discord)
        }
    }
}