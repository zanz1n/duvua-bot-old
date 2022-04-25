const slashCommand = require('../../structures/slashCommands')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
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
            embed.setDescription(`**Não há nenhum som na fila,  ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current
        const skip = new MessageButton().setCustomId('skip').setLabel('⏭️ Skip').setStyle('PRIMARY')
        const stop = new MessageButton().setCustomId('stop').setLabel('⏹️ Stop').setStyle('DANGER')
        const pause = new MessageButton().setCustomId('pause').setLabel('⏸️ Pause').setStyle('PRIMARY')
        const resume = new MessageButton().setCustomId('resume').setLabel('▶️ Resume').setStyle('SUCCESS')

        const button = new MessageActionRow().addComponents(skip, stop, pause, resume)

        embed.setThumbnail(song.thumbnail).setDescription(`**${interaction.user.username}**\n\nTocando agora: [${song.title}](${song.url})\n\n**Duração: [${song.duration}]**\n\n ${bar}`)

        await interaction.editReply({ content: null, embeds: [embed], components: [button] })
    }
}
