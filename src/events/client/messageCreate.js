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

        message.guild.db = await this.client.db.guilds.findById(message.guild.id) ||
            new this.client.db.guilds({ _id: message.guild.id, name: message.guild.name });

        const prefix = message.guild.db.prefix

        const [msgcommand] = await message.content.trim().substring(prefix.length).split(/\s+/)
        const args = message.content.replace(prefix + msgcommand, "")

        if (message.content === `<@${this.client.user.id}>`) return require("../../commands/info/help").execute(this.client, message, args)

        if (message.content.startsWith(prefix)) {

            const cmd = this.client.commands.find(el => el.name === msgcommand.toLowerCase())
            if (!cmd) return

            cmd.execute(this.client, message, args).catch((err) => {
                if (err) console.log("\x1b[31m[bot-err] something whent wrong trying to execute a slashCommand\x1b[0m\n",
                    err,
                    "\n\x1b[33m[bot-api] this may affect the usability of the bot\x1b[0m"
                )
            })
        }
    }
}
/*
 *const user = await this.client.database.user.findOne({ _id: message.author.id })
        const guild = await this.client.database.guild.findOne({ _id: message.guild.id })
        const Client = await this.client.database.user.findOne({ _id: this.client.user.id })

        if (!user) await this.client.database.user.create({ _id: message.author.id, name: message.author.tag })
        if (!guild) await this.client.database.guild.create({ _id: message.guild.id, name: message.guild.name })
        if (!Client) await this.client.database.client.create({ _id: this.client.user.id })

        if (user.name !== message.author.tag) await this.client.database.user.findOneAndUpdate({ _id: message.author.id }, { $set: { name: message.author.tag } })
        if (guild.name !== message.guild.name) await this.client.database.guild.findOneAndUpdate({ _id: message.guild.id }, { $set: { name: message.guild.name } })
 *
 * 
 * 
 * 
 * 
 * 
 */