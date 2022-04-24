const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }
    run = async () => {
        await this.client.connectToDatabase()

        this.client.user.setActivity(`use /help`);

        this.client.registrySlashCommands()
        console.log(`\x1b[33m[bot-api] logged to discord-api as ${this.client.user.tag} in ${this.client.guilds.cache.size} guild(s)\x1b[0m`)
    }
}

