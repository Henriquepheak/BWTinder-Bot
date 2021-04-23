const mongoose = require('mongoose');
const tokenData = require('../schemas/tokenschema');
const axios = require('axios');
const Discord = require('discord.js')
const settingsData = require('../schemas/usersettingschema')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

module.exports = {
    name: 'ready',
    once: true,
    async execute (client) {
        console.log(`Logged in as ${client.user.username}`);

        client.user.setPresence({
            activity: { name: `BWTinder Bot is helping people find love in ${client.guilds.cache.size} servers! | *help`},
            status: "dnd"
        })
        client.mongoose.init()



        const Guild = client.guilds.cache.map(guild => guild.id);
        Guild.forEach(async (guild) => {
            let guildObj = client.guilds.cache.get(guild)
            let members = guildObj.members.cache.map(member => member.user.id)
            for (const member of members) {
                let entry = await settingsData.findOne({userID: member})
                if (!entry) {
                    continue
                }
                if (entry.autoDMOn === true) {
                    acceptMatches(client, Discord);

                    setInterval(() => {
                        acceptMatches(client, Discord)
                    }, 60000*20)
                } else if (entry.autoDMOn === false) {
                    continue;
                } else {
                    continue;
                }
            }
        })
    }
}

async function acceptMatches(client, Discord) {
    const Guilds = client.guilds.cache.map(guild => guild.id);
        Guilds.forEach(async (guild) => {
            let guildObj = client.guilds.cache.get(guild)
            let members = guildObj.members.cache.map(member => member.user.id);
            let acceptedMatches = 0;
            let deniedMatches = 0;
            for (const member of members) {
                let entry = await tokenData.findOne({ userID: member })
                let userOBJ = guildObj.members.cache.get(member)
                if (entry === null) {
                    return
                }
                let apiToken = await cryptr.decrypt(entry.apiToken);
                let fetchMessage = await userOBJ.send('Fetching matches...')
                axios.post('https://bwtinder.com/api/profile', {
                    token: apiToken,
                }).then((res) => {
                    if (!res.data.success) return userOBJ.send('`The api request failed, this may be because of an incorrect api token.`')

                    let matches = res.data.matches;
                    if (matches.length === 0) {
                        const noMatchesEmbed = new Discord.MessageEmbed()
                        .setColor('F32626')
                        .setTitle(`No matches to accept: (${userOBJ.user.username})`)
                        .setDescription('There are no matches that are currently available to you')
                        .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', userOBJ.user.displayAvatarURL())
                        .setThumbnail(userOBJ.user.displayAvatarURL())
                        .setTimestamp()

                        fetchMessage.edit('Finished fetching, response below').then(() => {
                            return fetchMessage.edit(noMatchesEmbed);
                        }).catch(() => {
                            return userOBJ.send(noMatchesEmbed);
                        });
                    } else {
                        for (const match of matches) {
                            axios.post('https://bwtinder.com/api/outcome', {
                                match: true,
                                token: apiToken,
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
                    }
                    const embedMatches = new Discord.MessageEmbed()
                    .setColor('F32626')
                    .setTitle(`${acceptedMatches + deniedMatches} attempted accepts: (${userOBJ.user.username})`)
                    .setDescription(`Out of these people ${acceptedMatches} swiped right on you. However, ${deniedMatches} swiped left on you`)
                    .setFooter('As of now, you can check your matches only with api key. Contact BizarreAvatar#8346 if anything bugs out', userOBJ.user.displayAvatarURL())
                    .setThumbnail(userOBJ.user.displayAvatarURL())
                    .setTimestamp();

                    fetchMessage.edit('Finished fetching, response below').then(() => {
                        return fetchMessage.edit(embedMatches);
                    }).catch(() => {
                        return userOBJ.send(embedMatches);
                    });
                })
            }
        })
}

