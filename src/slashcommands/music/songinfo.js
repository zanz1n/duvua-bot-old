const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "songinfo",
            description: "Mostra o som que está tocando",
        })
    }

    async run(interaction) {
        const queue = this.client.player.getQueue(interaction.guildId)

        let embed = new MessageEmbed()

        if (!queue) {
            return embed.setDescription(`**Não há nenhum som na fila,  ${interaction.user.username}**`),
                await interaction.editReply({ embeds: [embed] })
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current

        embed.setThumbnail(song.thumbnail).setDescription(`**${interaction.user.username}**\n\nTocando agora: [${song.title}](${song.url})\n\n**Duração: [${song.duration}]**\n\n ${bar}`)

        await interaction.editReply({ embeds: [embed] })
    }
}