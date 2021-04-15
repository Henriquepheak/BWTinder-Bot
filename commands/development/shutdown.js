module.exports = {
    name: "shutdown",
    description: "Shuts down the bot",
    execute(client, message, args, Discord) {
        if (message.member.roles.cache.find(role => role.id === "826514038288416828")) {
            message.channel.send("Shutting down...").then(m => {
                client.destroy()
            })
        }
    }
}