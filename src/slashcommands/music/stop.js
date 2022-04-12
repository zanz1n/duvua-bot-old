const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "stop",
            description: "Para o bot e limpa a fila de reprodução",
        })
    }

    async run(interaction) {
        const queue = this.client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) {
            return embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${interaction.user.username}**`),
                await interaction.editReply({ embeds: [embed] })
        }
        if (!queue) {
            return embed.setDescription(`**Não há nenhum som na fila,  ${interaction.user.username}**`),
                await interaction.editReply({ embeds: [embed] })
        }

        queue.destroy()

        embed.setDescription(`**A fila foi limpa por ${interaction.user.username}**`)
        await interaction.editReply({ embeds: [embed] })
    }
}