const slashCommand = require('../../structures/slashCommands')
const { Permissions } = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "say",
            description: "Eu falo o que você me pedir",
            options: [
                {
                    name: "content",
                    description: "O que você quer que eu fale",
                    type: 3,
                    required: true
                }
            ]
        })
    }
    async run(interaction) {
        const embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${interaction.user.username}**`)
            return await interaction.editReply({ embeds: [embed] })
        }
        await interaction.editReply({ content: `${interaction.options.getString('content')}\n-${interaction.user}` })
    }
}
