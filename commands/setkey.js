const axios = require('axios');

module.exports = {
    name: "setkey",
    description: "Checks your bwtinder profile",
    execute(client, message, args, Discord) {
        if (message.channel.type === "dm") {
            let apiKey = args[0];
            if (!apiKey) {
                message.channel.send('Error: No API Key. To get this, go to: https://bit.ly/3t8vTc9.')
            } else {
                console.log(apiKey)
            }
        } else {
            message.channel.send('This needs to be executed in dms with the bot.')
        }
    }
}

