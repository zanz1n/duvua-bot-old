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
                    description: "O que você quer que eu fale ~/n para quebrar linha~",
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
        String.prototype.allReplace = function (obj) {
            var retStr = this
            for (var x in obj) {
                retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
            }
            return retStr
        }

        embed.setDescription(interaction.options.getString('content').allReplace({ '/n': '\n' }))
            .setFooter({ text: `Mensagem de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()
        await interaction.editReply({ embeds: [embed] })
    }
}
