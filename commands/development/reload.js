const fs = require('fs');

module.exports = {
    name: "reload",
    description: "Reloads a command",
    execute(client, message, args, Discord) {
        if(!args.length) return message.channel.send("You didn't pass any commands to reload!");
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return message.channel.send("This command does not exist.")

        const commandFolders = fs.readdirSync("./commands");
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`))

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        }
        catch(err) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor("#384281")
            .setTitle("Error")
            .setAuthor("Deliberate", "https://i.imgur.com/fwswgrr.png")
            .setDescription("An error occured while executing this command!")
            .addFields(
                {name: "Specific Error:", value: `\`\`\`js\n${err}\`\`\``}
            )
            .setThumbnail("https://i.imgur.com/fwswgrr.png")
            .setFooter("Beep boop! I am a bot. If there is an error with this embed, please contact the developer of this bot, @ceph#4422!", "https://i.imgur.com/fwswgrr.png")
            
            message.channel.send(errorEmbed)
            console.log(err);
        }

        message.channel.send(`This command was successfully reloaded!\n\nReloaded command: \`${command.name}\``)
    }
}