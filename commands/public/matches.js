const axios = require('axios');
const tokenData = require('../../schemas/tokenschema');

module.exports = {
    name: "matches",
    description: "Accepts your bwtinder matches",
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
            let msg = await message.channel.send('Fetching...');
            axios.post('https://bwtinder.com/api/profile', {
                token: apiKey
            }).then((res) => {
                if (!res.data.success) return message.reply('`The api request failed, this may be because of an incorrect api token.`');

                let matches = res.data.matches;
                if (matches.length === 0) {
                    const noMatchesEmbed = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`No matches to accept: (${message.author.tag})`)
                        .setDescription('There are no matches that are currently available to you')
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp()
                        
                    msg.edit('Finished fetching, response below').then(() => {
                        return msg.edit(noMatchesEmbed);
                    }).catch(() => {
                        return message.channel.send(noMatchesEmbed);
                    });
                } else {
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
                    const embedMatches = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`${acceptedMatches + deniedMatches} attempted accepts: (${message.author.tag})`)
                        .setDescription(`Out of these people ${acceptedMatches} swiped right on you. However, ${deniedMatches} swiped left on you`)
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL())
                        .setTimestamp();
                    
                    msg.edit('Finished fetching, response below').then(() => {
                        return msg.edit(embedMatches);
                    }).catch(() => {
                        return message.channel.send(embedMatches);
                    });
                }

            }).catch((err) => {
                console.error(err)
            })
        }
    }
}