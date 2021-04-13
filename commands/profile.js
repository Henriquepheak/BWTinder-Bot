const axios = require('axios');
const tokenData = require('../schemas/tokenschema');

module.exports = {
    name: "profile",
    description: "Checks your bwtinder profile",
    async execute(client, message, args, Discord) {
        
        let apiKey;
        let user = await tokenData.findOne({ userID: message.author.id});

        if (args[0]) {
            message.delete();
            apiKey = args[0];
        } else if (user) apiKey = user.apiToken;

        if (!apiKey) {
            message.channel.send(`Error: No API Key Specified. To get this, go to: https://bit.ly/3t8vTc9`)
        } else {
            axios.post('https://bwtinder.com/api/user', {
                token: apiKey
            }).then((res) => {
                if (!res.data.success) return message.reply('`The api request failed, this may be because of an incorrect api token.`');

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag}'s BWTinder Profile`)
                    .setDescription(`Bio: ${res.data.bio}`)
                    .addFields(
                        {name: "**IGN**", value: res.data.player.username, inline: false},
                        {name: "**Age**", value: res.data.age, inline: false},
                        {name: "**Date of Birth**", value: res.data.dob, inline: false},
                        {name: "**Gender**", value: res.data.gender, inline: false},
                        {name: "**Looking For**", value: res.data.looking.gender, inline: false},
                        {name: "**UUID**", value: res.data.uuid, inline: false},
                        {name: "**Discord ID**", value: res.data.discordID, inline: false},
                        {name: "**Banned**", value: res.data.banned, inline: false},
                    )
                    .setColor('F32626')
                    .setFooter('As of now, you can check your profile only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                message.channel.send(embed)
            }).catch((err) => {
                console.error(err)
            })
        }
    }
}
