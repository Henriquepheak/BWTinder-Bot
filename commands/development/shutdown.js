module.exports = {
    name: "shutdown",
    description: "Shuts down the bot",
    execute(client, message, args, Discord) {
        if (message.member.roles.cache.find(role => role.name === "Developer")) {
            message.channel.send("Shutting down...").then(m => {
                client.destroy()
            })
        }
    }
}