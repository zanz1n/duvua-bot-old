const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "skip",
            description: "Pula a música que está tocando",
        })
    }

    async run(interaction) {
        const queue = this.client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

        if (!queue) {
            embed.setDescription(`**Não há nenhum som na fila,  ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        queue.skip()

        embed.setDescription(`**Música** ${queue.current.title} **pulada por ${interaction.user.username}**`)
        await interaction.editReply({ content: null, embeds: [embed] })
    }
}