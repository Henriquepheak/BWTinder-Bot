const fs = require('fs');

module.exports = (client, Discord) => {
    const eventFiles = fs.readdirSync('C:/Users/Andrew/Videos/BWTinder Bot/events').filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}