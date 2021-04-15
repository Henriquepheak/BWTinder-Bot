module.exports = {
    name: "shutdown",
    description: "Shuts down the bot",
    execute(client, message, args, Discord) {
        message.channel.send("Shutting down...").then(m => {
            client.destroy()
        })
    }
}