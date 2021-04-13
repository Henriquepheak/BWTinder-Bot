module.exports = {
    name: "help",
    description: "Send an embed containing every command possible",
    execute(client, message, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setColor("F32626")
            .setTitle("Help")
            .setDescription("Need help? Look no further!")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Prefix", value: "The prefix for the bot is `\"*\"`"},
                { name: "matches", value: "Shows how many people you have available. If you have any, you will auto accept them. It swipes for you!"},
                { name: "profile", value: "Displays your profile on bedwars tinder. It displays your age, discord id, uuid, ign, date of birth, etc."},
                { name: "setkey", value: "Placeholder Value"}
            )
            .setFooter("As of now, you can check your profile only with api key. Contact BizarreAvatar#8346 if anything bugs out", message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    }
}