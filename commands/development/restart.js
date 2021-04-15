require("dotenv").config

module.exports = {
    name: "restart",
    description: "Restarts the bot",
    execute(client, message, args, Discord) {
        message.channel.send("Restarting...").then(msg => {
            client.destroy()
            client.login(process.env.TOKEN)
            msg.edit("Restart successful!")
            client.user.setPresence({
                activity: { name: `BWTinder Bot is helping people find love in ${client.guilds.cache.size} servers! | *help`},
                status: "dnd"
            })
        })
    }
}