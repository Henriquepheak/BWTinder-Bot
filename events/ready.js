const mongoose = require('mongoose');
const tokenData = require('../schemas/tokenschema');

module.exports = {
    name: 'ready',
    once: true,
    async execute (client) {
        console.log(`Logged in as ${client.user.username}`)

        client.user.setPresence({
            activity: { name: `BWTinder Bot is helping people find love in ${client.guilds.cache.size} servers! | *help`},
            status: "dnd"
        })
        client.mongoose.init()

        const Guilds = client.guilds.cache.map(guild => guild.id);
        Guilds.forEach(guild => {
            let guildObj = client.guilds.cache.get(guild)
            let members = guildObj.members.cache.map(member => member.user.id);
            for (const member of members) {
                console.log(member)
            }
        })
    }
}

async function getKey(user) {
    const filter =  {
        userID: user,
    }
    let entry = await tokenData.findOne(filter);
    return entry;
}