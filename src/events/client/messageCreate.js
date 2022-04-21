const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        })
    }
    run = async (message) => {
        if (message.author.bot) return
        if (!message.guild) return

        const [msgcommand] = await message.content.trim().substring(this.client.prefix.length).split(/\s+/)
        const args = message.content.replace(this.client.prefix + msgcommand, "")

        if (message.content.startsWith(this.client.prefix)) {

            const cmd = this.client.commands.find(el => el.name === msgcommand.toLowerCase())
            if (!cmd) return

            cmd.execute(this.client, message, args)
        }
        else if (message.content === `<@${this.client.user.id}>`) return require("../../commands/info/help").execute(this.client, message, args)
    }
}