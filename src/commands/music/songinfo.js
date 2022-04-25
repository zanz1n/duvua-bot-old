const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = {
    name: "songinfo",
    description: "Mostra o som que está tocando",
    async execute(client, message, args) {
        const msg = await message.channel.send("`Pensando [...]`")
        const queue = client.player.getQueue(message.guildId)

        let embed = new MessageEmbed()

        if (!queue) {
            embed.setDescription(`**Não há nenhum som na fila,  ${message.author.username}**`)
            return await msg.edit({ content: null, embeds: [embed] })
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

        embed.setThumbnail(song.thumbnail)
            .setDescription(`**${message.author.username}**\n\nTocando agora: [${song.title}](${song.url})\n\n**Duração: [${song.duration}]**\n\n ${bar}`)

        await msg.edit({ content: null, embeds: [embed], components: [button] })
    }
}
