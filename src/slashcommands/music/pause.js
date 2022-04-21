const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "pause",
            description: "Pausa a reprodução do bot",
        })
    }

    async run(interaction) {
        const queue = this.client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        if (!queue) {
            embed.setDescription(`**Não há nenhum som na fila,  ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }

        queue.setPaused(true)

        embed.setDescription(`**Bot pausado por ${interaction.user.username}**\nUse /resume para continuar a reprodução`)
        await interaction.editReply({ content: null, embeds: [embed] })
    }
}