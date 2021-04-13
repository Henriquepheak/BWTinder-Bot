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
                console.log(apiKey) // For Now(Once mongo is fixed ill add database support) -- Bizarre
            }
        } else {
            message.channel.send('This needs to be executed in DMs with the bot. If you do not have them on, turn them on.')
        }
    }
}

// SetKey Command (*setkey || BizarreAvatar)