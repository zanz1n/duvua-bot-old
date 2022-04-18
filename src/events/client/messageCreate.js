const Event = require("../../Event.js")

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        })
    }
    run = async (message) => {
        if (message.author.bot || !message.content.startsWith(this.client.prefix)) return
        
        const [msgcommand] = await message.content.trim().substring(this.client.prefix.length).split(/\s+/)//.toLowerCase()

        const cmd = this.client.commands.find(el => el.name === msgcommand)
        const args = message.content.replace(this.client.prefix + msgcommand, "")

        cmd.execute(this.client, message, args)
    }
}