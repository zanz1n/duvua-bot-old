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

        message.member.db = await this.client.db.member.findById(message.guild.id + message.author.id) ||
            new this.client.db.member({ _id: message.guild.id + message.author.id, guildid: message.guild.id, userid: message.author.id, usertag: message.author.tag });

        message.author.db = await this.client.db.user.findById(message.author.id) ||
            new this.client.db.user({ _id: message.author.id, usertag: message.author.tag });

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

        message.member.db.xp++
        if (message.member.db.usertag !== message.author.tag) message.member.db.usertag = message.author.tag

        if (message.author.db.usertag !== message.author.tag) message.author.db.usertag = message.author.tag

        if (message.guild.db.name !== message.guild.name) message.guild.db.name = message.guild.name

        let meta = 3 * (message.member.db.level ** 2)

        if (message.member.db.xp >= meta) {
            const embed = new MessageEmbed()
            while (message.member.db.xp >= meta) {
                meta = 3 * (message.member.db.level ** 2)
                message.member.db.level++
                message.member.db.xp -= meta
            }

            if (message.member.db.level === 2) {
                embed.setDescription(`**Parabéns ${message.author}, você avançou para o level ${message.member.db.level}**
                Para conquistar mais níveis, coninue interagindo nesse serivdor.`
                )
            } else embed.setDescription(`**Parabéns ${message.author}, você avançou para o level ${message.member.db.level}**`)
            message.channel.send({ embeds: [embed] })
        }

        message.author.db.save()
        message.member.db.save()
        message.guild.db.save()
    }
}
