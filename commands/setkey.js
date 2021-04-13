const axios = require('axios');
const tokenData = require('../schemas/tokenschema')

module.exports = {
    name: "setkey",
    description: "Checks your bwtinder profile",
    execute(client, message, args, Discord) {
        if (message.channel.type === "dm") {
            let apiKey = args[0];
            if (!apiKey) {
                message.channel.send('Error: No API Key. To get this, go to: https://bit.ly/3t8vTc9.')
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('F32626')
                    .setTitle('Success!')
                    .setDescription('Sucessfully saved your api key to the database.')
                    .setThumbnail(message.author.displayAvatarURL())
                    .setFooter("As of now, you can save your api key only with mongodb. Contact BizarreAvatar#8346 if anything bugs out", message.author.displayAvatarURL())
                    .setTimestamp()
                message.channel.send(embed).then(() => {
                    console.log(`Saved db data of ${message.author.id} to MongoDB`)
                }).catch((err) => {
                    console.log(`Error with *setkey: ${err}`)                    
                })
                saveDBData(message.author.id, apiKey)
            }
        } else {
            message.channel.send('This needs to be executed in DMs with the bot. If you do not have them on, turn them on.')
        }
    }
}

// Save DB Data Function
function saveDBData(userID, apiToken) {
    const tokenDB = new tokenData({
        userID,
        apiToken,
    });
    tokenDB.save()
}