const { MessageEmbed } = require('discord.js')
const slashCommand = require('../../structures/slashCommands')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "embed",
            description: "Faço uma embed com o que me disser",
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
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${interaction.user.username}**`)
            return await interaction.editReply({ embeds: [embed] })
        }
        if (interaction.options.getString('content') === "" || undefined) {
            embed.setDescription("**Você precisa inserir algo na embed**")
            return await interaction.editReply({ embeds: [embed] })
        }
        embed.setTitle(interaction.options.getString('content'))
            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()
        await interaction.editReply({ embeds: [embed] })
    }
}
