const Bot = require('../../structures/Client')
const { Message, MessageEmbed } = require('discord.js')
const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        })
    }
    /**
     * 
     * @param {Message} message 
     * @param {Bot} this.client
     * 
     */
    run = async (message) => {
        if (message.author.bot) return
        if (!message.guild) return



        message.guild.db = await this.client.db.guilds.findById(message.guild.id) ||
            new this.client.db.guilds({ _id: message.guild.id, name: message.guild.name });

        message.author.db = await this.client.db.member.findById(message.guild.id + message.author.id) ||
            new this.client.db.member({ _id: message.guild.id + message.author.id, guildid: message.guild.id, userid: message.author.id, usertag: message.author.tag });

        const prefix = message.guild.db.prefix

        const [msgcommand] = await message.content.trim().substring(prefix.length).split(/\s+/)
        const args = message.content.replace(prefix + msgcommand, "")

        if (message.content === `<@${this.client.user.id}>`) return require("../../commands/info/help").execute(this.client, message, args)

        if (message.content.startsWith(prefix)) {

            const cmd = this.client.commands.find(el => el.name === msgcommand.toLowerCase())
            if (!cmd) return

            return cmd.execute(this.client, message, args).catch((err) => {
                if (err) console.log("\x1b[31m[bot-err] something whent wrong trying to execute a slashCommand\x1b[0m\n",
                    err,
                    "\n\x1b[33m[bot-api] this may affect the usability of the bot\x1b[0m"
                )
            })
        }

        message.author.db.xp++
        if (message.author.db.usertag !== message.author.tag) message.author.db.usertag = message.author.tag

        if (message.guild.db.name !== message.guild.name) message.guild.db.name = message.guild.name
        const meta = 3 * (message.author.db.level ** 2)

        if (message.author.db.xp === meta) {
            const embed = new MessageEmbed()
            if (message.author.db.level === 1) {
                embed.setDescription(`**Parabéns ${message.author}, você avançou para o level ${message.author.db.level + 1}**\nPara avançar de nível você pode interagir mais nesse servidor.`)
            } else embed.setDescription(`**Parabéns ${message.author}, você avançou para o level ${message.author.db.level + 1}**`)
            message.author.db.xp = 0
            message.author.db.level++

            message.channel.send({ embeds: [embed] })
        }

        message.author.db.save()
        message.guild.db.save()
    }
}
