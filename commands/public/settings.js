const mongoose = require('mongoose')
const userSettings = require('../../schemas/usersettingschema')

module.exports = {
    name: "settings",
    description: "Settings for BWTinder Bot",
    async execute(client, message, args, Discord) {
        let settingsEntry = await userSettings.findOne({ userID: message.author.id })
        if (!settingsEntry) {
            saveDBData(message.author.id)
            message.channel.send('Created default settings. Type *settings again to view them')
            return
        }
        if (message.channel.type == 'DM') {
            message.author.send('You need to execute this in #bot-commands')
        } else {
            if (!args[0]) {
                const embed = new Discord.MessageEmbed()
                    .setColor('F32626')
                    .setTitle(`Settings: ${message.author.username}`)
                    .setDescription(`These are the settings that ${message.author.username} saved in MongoDB`)
                    .addFields(
                        {name: "**Automatically Accept Matches**", value: `${settingsEntry.autoDMOn}`},
                        {name: "**Run *setkey in DMs**", value: settingsEntry.setKeyInDMS}
                    )
                    .setFooter('Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()    
                    message.channel.send(embed)  
            } else if (args[0].toLowerCase() === "change") {
                if (!args[1]) {
                    message.channel.send('Error: Invalid Syntax. Valid Syntax: *settings || *settings change <autoaccept/setkey>');
                    return
                }
                if (args[1].toLowerCase() === 'autoaccept') {
                    if (settingsEntry.autoDMOn === true) {
                        settingsEntry.update({
                            autoDMOn: 'false',
                        })
                        message.channel.send(`Toggled 'autoaccept' parameter to false`);
                    } else if (settingsEntry.autoDMOn === false) {

                        message.channel.send(`Toggled 'autoaccept' parameter to true`);
                    } else {
                        console.log('Error with autoaccept parameter')
                    }
                } else if (args[1].toLowerCase() === 'setkey') {
                    if (settingsEntry.setKeyInDMS === true) {
                        settingsEntry.update({
                            setKeyInDMS: 'false',
                        })
                        message.channel.send(`Toggled 'setkey' parameter to false`);
                    } else if (settingsEntry.setKeyInDMS === false) {
                        settingsEntry.update({
                            setKeyInDMS: 'true',
                        })
                        message.channel.send(`Toggled 'setkey' parameter to true`);
                    } else {
                        console.log('Error with setkey parameter.')
                    }
                }
            } else {
                message.channel.send('Error: Invalid Syntax. Valid Syntax: *settings || *settings change <autoaccept/setkey>');
            }
        }
    }
}

function saveDBData(userID) {
    const settingsDB = new userSettings({
        userID, 
        autoDMOn: false,
        setKeyInDMS: true,
    });
    settingsDB.save();
}

