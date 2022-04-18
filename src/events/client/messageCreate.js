const Event = require("../../Event.js")

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        })
    }
    run = async (message) => {
        const client = this.client
        if (message.author.bot) return

        if (message.content.startsWith(this.client.prefix)) {

            const [msgcommand] = await message.content.trim().substring(this.client.prefix.length).split(/\s+/)
            const args = message.content.replace(this.client.prefix + msgcommand, "")

            const cmd = this.client.commands.find(el => el.name === msgcommand.toLowerCase())
            if (!cmd) return

            cmd.execute(this.client, message, args)
        } else {
            const [msgcommand] = await message.content.trim().substring(client.prefix.length).split(/\s+/)
            const args = message.content.replace(this.client.prefix + msgcommand, "")
            if (message.content === `<@${this.client.user.id}>`) return require("../../commands/info/help").execute(this.client, message, args)
        }
    }
}