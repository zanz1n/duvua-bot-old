const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const Bot = require('../../structures/Client')
const { Interaction } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Mostra o level de interação no servidor de algum membro",
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
        const embed = new MessageEmbed()
        const options = interaction.options._hoistedOptions
        const user = (options.find((e) => e.name === "pessoa") && options.find((e) => e.name === "pessoa").member.user) || interaction.user

        if (user.bot) {
            embed.setDescription(`**${user} é um bot, ${interaction.user.username}**`)
            return interaction.editReply({ content: null, embeds: [embed] })
        }

        const mensioned = await this.client.db.member.findById(interaction.guild.id + user.id) ||
            new this.client.db.member({ _id: interaction.guild.id + user.id, guildid: interaction.guild.id, userid: user.id, usertag: user.tag });

        mensioned.save()

        const meta = 3 * (mensioned.level ** 2)
        if (user.id === interaction.user.id) {
            embed.setDescription(`**Seu level atual no servidor ${interaction.guild.name} é ${mensioned.level}**
            Para que você atinja o level ${mensioned.level + 1} serão necessários mais ${meta - mensioned.xp} pontos! (${mensioned.xp}/${meta})`
            )
        } else {
            embed.setDescription(`**O level atual de ${user.username} em ${interaction.guild.name} é ${mensioned.level}**
            Para que ${user.username} atinja o level ${mensioned.level + 1} serão necessários mais ${meta - mensioned.xp} pontos! (${mensioned.xp}/${meta})`
            )
        }

        interaction.editReply({ content: null, embeds: [embed] })
    }
}
