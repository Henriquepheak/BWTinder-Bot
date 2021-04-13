const axios = require('axios');

module.exports = {
    name: "matches",
    description: "Checks your bwtinder matches",
    execute(client, message, args, Discord) {
        message.delete()
        let apiKey = args[0];
        if (!apiKey) {
            message.channel.send(`Error: No API Key Specified. To get this, go to: https://bit.ly/3t8vTc9`)
        } else {
            axios.post('https://bwtinder.com/api/profile', {
                token: apiKey
            }).then((res) => {
                let matches = res.data.matches;
                if (matches.length === 0) {
                    const noMatchesEmbed = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`No matches: (${message.author.tag})`)
                        .setDescription('There are no matches that are currently available to you')
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                    message.channel.send(noMatchesEmbed)
                    return
                }
                const embed = new Discord.MessageEmbed()
                    .setColor('F32626')
                    .setTitle(`${message.author.tag}'s Bedwars Tinder Matches: Description`)
                    .setColor('F32626')
                    .setDescription(`There are ${res.data.matches.length} people who swiped right to you. Check your dms. If they are not on for the bot, turn them on.`)
                    .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                message.channel.send(embed)
                for (const match of res.data.matches) {
                    let matchEmbed = new Discord.MessageEmbed()
                        .setThumbnail(`https://minotar.net/avatar/${match.uuid}/512`)
                        .setTitle(`Match: ${match.player.username}`)
                        .setDescription(`This person swiped right on you. Their bio is: ${match.bio}`)
                        .setColor('F32626') 
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setTimestamp()
                        .addFields(
                            {name: "**IGN**", value: match.player.username, inline: false},
                            {name: "**Age**", value: match.age, inline: false},
                            {name: "**Gender**", value: match.gender, inline: false},
                            {name: "**Looking For**", value: match.looking.gender, inline: false},
                            {name: "**UUID**", value: match.uuid, inline: false},
                            {name: "**Discord ID**", value: match.discordID, inline: false},
                        )   
                        message.channel.send(matchEmbed)        
                }
                    
            }).catch((err) => {
                console.error(err)
            })
        }
    }
}