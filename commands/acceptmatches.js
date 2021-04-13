const axios = require('axios');

module.exports = {
    name: "acceptmatches",
    description: "Accepts your bwtinder matches",
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
                        .setTitle(`No matches to accept: (${message.author.tag})`)
                        .setDescription('There are no matches that are currently available to you')
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                    message.channel.send(noMatchesEmbed)
                    return
                }
                let acceptedMatches = 0;
                let deniedMatches = 0;

                for (const match of matches) {
                    axios.post('https://bwtinder.com/api/outcome', {
                        match: true,
                        token: apiKey,
                        user: match.discordID
                    }).then((result) => {
                        if (result.data.match === true) {
                            acceptedMatches++;
                        } else if (result.data.match === false) {
                            deniedMatches++;
                        } else {
                            console.log(`Error checking matches`)
                        }
                    })
                }
                if (acceptedMatches === 0) {
                    if (deniedMatches === 0) {
                        const noMatchesAtAllEmbed = new Discord.MessageEmbed()
                            .setColor('F32626')
                            .setTitle(`No matches to accept: (${message.author.tag})`)
                            .setDescription('There are no matches that are currently available to you')
                            .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                            .setThumbnail(message.author.displayAvatarURL())
                            .setTimestamp()
                        message.channel.send(noMatchesAtAllEmbed)
                    } else {
                        const noAcceptedSomeDenied = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`**Success!: ${message.author.tag}**`)
                        .setDescription(`Out of the people you tried to accept, ${deniedMatches} denied you and 0 accepted you`)
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        message.channel.send(noAcceptedSomeDenied)
                    }
                } else if (acceptedMatches > 0) {
                    if (deniedMatches === 0) {
                        const noDeniedSomeAccepted = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`**Success!: ${message.author.tag}**`)
                        .setDescription(`Out of the people you tried to accept, 0 denied you and ${acceptedMatches} accepted you`)
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        message.channel.send(noDeniedSomeAccepted)
                    } else {
                        const someAcceptedSomeDenied = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`**Success!: ${message.author.tag}**`)
                        .setDescription(`Out of the people you tried to accept, ${deniedMatches} denied you and ${acceptedMatches} accepted you`)
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        message.channel.send(someAcceptedSomeDenied)                        
                    }
                } else {
                    console.log(`Error with matches`)
                }
            }).catch((err) => {
                console.error(err)
            })
        }
    }
}