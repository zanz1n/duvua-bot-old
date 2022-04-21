const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }
    run = () => {
        this.client.user.setActivity(`type /help or ${this.client.prefix}help`);

        this.client.registrySlashCommands()
        console.log(`\x1b[33m[bot-api] Client logged to discord-api as ${this.client.user.username} in ${this.client.guilds.cache.size} guild(s)\x1b[0m`)
        //console.log("\x1b[33m[bot-api] memoryUsage: " + parseInt(memoryUsage().heapTotal / 1024 ** 2) + "/" + parseInt(memoryUsage().rss / 1024 ** 2) + " MB\x1b[0m") //to check memory usage when bot finish load
    }
}