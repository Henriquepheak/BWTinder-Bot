module.exports = {
    name: "devhelp",
    description: "Send an embed containing every developer command",
    execute(client, message, args, Discord) {
        if (message.member.roles.cache.find(role => role.id === "826514038288416828")) {
            const embed = new Discord.MessageEmbed()
            .setColor("F32626")
            .setTitle("Help")
            .setDescription("Need help? Look no further!")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Prefix", value: "The prefix for the bot is `\*\`"},
                { name: "Commands", value: "Below is a list of commands that may be executed by typing in chat the prefix followed by command name:\n---------------------------------------------------------------------"},
                { name: "• reload", value: "Reloads a certain command rather than the whole bot."},
                { name: "• restart", value: "Restarts the bot by killing the client then logging back in."},
                { name: "• shutdown", value: "Shuts down all instances of the bot. Can be useful if multiple are left open."},
                { name: "• uptime", value: "Displays the uptime for the bot in hours:minutes:seconds."}
            )
            .setFooter("As of now, you can check your profile only with api key. Contact BizarreAvatar#8346 if anything bugs out", message.author.displayAvatarURL())
            .setTimestamp()
            
            message.channel.send(embed)
        }
    }
}