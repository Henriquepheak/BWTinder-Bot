const mongo = require('../utils/mongoose')

module.exports = {
    name: 'ready',
    once: true,
    async execute (client) {
        console.log(`Logged in as ${client.user.tag}`)

        client.user.setPresence({
            activity: { name: `BWTinder Bot is helping people find love in ${client.guilds.cache.size} servers! | *help`},
            status: "dnd"
        })

        await mongo().then((mongoose) => {
            try {
                console.log('----------------------------------------')
            } finally {
                mongoose.connection.close()
            }
        })
    }
}