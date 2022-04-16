const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "songinfo",
    description: "Mostra o som que está tocando",
    async execute(client, message, args) {
        const msg = await message.channel.send("`Pensando [...]`")
        const queue = client.player.getQueue(message.guildId)

        let embed = new MessageEmbed()

        if (!queue) {
            return embed.setDescription(`**Não há nenhum som na fila,  ${message.author.username}**`),
                await msg.edit({ content: " ", embeds: [embed] })
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current

        embed.setThumbnail(song.thumbnail)
            .setDescription(`**${message.author.username}**\n\nTocando agora: [${song.title}](${song.url})\n\n**Duração: [${song.duration}]**\n\n ${bar}`)

        await msg.edit({ content: " ", embeds: [embed] })
    }
}