const Event = require('../../Event')
const { memoryUsage } = require('process')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }
    run = () => {
        this.client.registrySlashCommands()
        console.log(`\x1b[34m[bot-api] Client logged to discord-api as ${this.client.user.username} in ${this.client.guilds.cache.size} guild(s)\x1b[0m`)
        //console.log("[bot-api] memoryUsage: " + parseInt(memoryUsage().heapTotal / 1024 ** 2) + "/" + parseInt(memoryUsage().rss / 1024 ** 2) + " MB") //to check memory usage when bot finish load
    }
}