const Event = require('../../Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }
    run = () => {
        console.log(`\x1b[34m[bot-api] Client logged to discord-api as ${this.client.user.username} in ${this.client.guilds.cache.size} guild(s)\x1b[0m`)
        this.client.registrySlashCommands()
    }
}