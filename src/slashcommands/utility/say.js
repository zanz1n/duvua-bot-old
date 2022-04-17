const slashCommand = require('../../slashCommands')
const { Permissions } = require('discord.js')

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
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${interaction.user.username}**`),
                await interaction.editReply({ embeds: [embed] })
        }
        await interaction.editReply({ content: `${interaction.options.getString('content')}\n-${interaction.user}` })
    }
}