const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed, MessageAttachment, Interaction } = require('discord.js')
const Bot = require('../../structures/Client')
const Canvacord = require('canvacord')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Mostra o level de algum membro do servidor",
            options: [
                {
                    name: "pessoa",
                    description: "De quem você deseja ver o level",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    /**
     * 
     * @param {Interaction} interaction
     * @param {Bot} this.client
     * 
     */
    async run(interaction) {
        const options = interaction.options._hoistedOptions
        const user = (options.find((e) => e.name === "pessoa") && options.find((e) => e.name === "pessoa").member.user) || interaction.user
        const member = (options.find((e) => e.name === "pessoa") && options.find((e) => e.name === "pessoa").member) || interaction.member

        const embed = new MessageEmbed()
        if (user.bot) {
            if (user.id === this.client.user.id) {
                embed.setDescription(`**Meu level é uma incógnita, ou talvez ele só não exista \:thinking:**`)

            } else embed.setDescription(`**${user} é um bot, ${interaction.user.username}**`)
            return interaction.editReply({ content: null, embeds: [embed] })
        }

        const mensioned = await this.client.db.member.findById(interaction.guild.id + user.id) ||
            new this.client.db.member({ _id: interaction.guild.id + user.id, guildid: interaction.guild.id, userid: user.id, usertag: user.tag });

        mensioned.save()

        const meta = 3 * (mensioned.level ** 2)

        const rank = new Canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setLevel(mensioned.level)
            .setCurrentXP(mensioned.xp)
            .setBackground("COLOR", "#464e4e")
            .setRank(0)
            .setRequiredXP(meta)
            .setStatus("dnd")
            .setProgressBar(member.displayHexColor, "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
        rank.build().then(data => {
            interaction.editReply({ content: null, files: [data] })
        })
    }
}
