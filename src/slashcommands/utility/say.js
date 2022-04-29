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
                    description: "O que você quer que eu fale ~/n para quebrar linha~",
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
        String.prototype.allReplace = function (obj) {
            var retStr = this;
            for (var x in obj) {
                retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
            }
            return retStr;
        }

        const content = interaction.options.getString('content').allReplace({ '/n': '\n' })
        await interaction.editReply({ content: `${content}\n-${interaction.user}` })
    }
}
