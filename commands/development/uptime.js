module.exports = {
    name: "uptime",
    description: "Checks the uptime of the bot",
    execute(client, message, args, Discord) {

        uptime = client.uptime / 1000
        let totalUptimeHours = Math.floor(uptime / 60 / 60)
        let totalUptimeMinutes = Math.floor(uptime / 60) - (totalUptimeHours * 60);
        let totalUptimeSeconds = Math.floor(uptime % 60)

        message.channel.send(`The total uptime of the bot is \`${totalUptimeHours}\` hours, \`${totalUptimeMinutes}\` minutes and \`${totalUptimeSeconds}\` seconds. \n\`${totalUptimeHours}:${totalUptimeMinutes}:${totalUptimeSeconds}\``)
    }
}