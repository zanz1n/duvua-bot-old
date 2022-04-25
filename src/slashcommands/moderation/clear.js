const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "clear",
            description: "Limpa uma quantidade mensagens no chat",
            options: [
                {
                    name: "quantidade",
                    description: "A quantidade de mensagens que deseja excluir",
                    type: 10,
                    required: false
                },
                {
                    name: "usuario",
                    description: "De quem você deseja excluir as mensagens",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async run(interaction) {
        const embed = new MessageEmbed()

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${interaction.user.username}.**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        const amount = interaction.options.getNumber("quantidade")
        const target = interaction.options.getMember("usuario")

        if (amount > 99 || amount < 1) {
            embed.setDescription(`**A quantidade precisa ser um número inteiro entre 1 e 100,  ${interaction.user.username}.**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        interaction.deleteReply()
        const messages = await interaction.channel.messages.fetch()

        if (target) {
            let i = 0
            const filter = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filter.push(m)
                    i++
                }
            })

            await interaction.channel.bulkDelete(filter, true).then(msgs => {
                embed.setDescription(`**Foram limpadas \`${msgs.size}\` mensagens de ${target}!**`)
                interaction.channel.send({ content: null, embeds: [embed] })
            })
        } else {
            await interaction.channel.bulkDelete(amount, true).then(msgs => {
                embed.setDescription(`**Foram limpadas ${msgs.size} mensagens no canal de texto!**`)
                interaction.channel.send({ content: null, embeds: [embed] })
            })
        }
    }
}
