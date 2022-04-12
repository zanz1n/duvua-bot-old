const { MessageEmbed } = require('discord.js')
const slashCommand = require('../../slashCommands')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "embed",
            description: "Faz uma embed com o que você me disser",
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
        let embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${interaction.user.username}**`),
                await interaction.editReply({ embeds: [embed] })
        }
        if (interaction.options.getString('content') === "" || undefined || " ") {
            return embed.setDescription("Você precisa inserir algo na embed"),
            interaction.editReply({embeds: [embed]})
        }
        embed.setTitle(interaction.options.getString('content'))
        .setFooter({text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.author.displayAvatarURL()})
        await interaction.editReply({ content: `${interaction.options.getString('content')}\n-${interaction.user}` })
    }
}