const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "queue",
    description: "Exibe o som que está tocando na fila",
    async execute(client, message, args) {
        const msg = await message.channel.send("`Pensando [...]`")
        const queue = client.player.getQueue(message.guildId)
        let embed = new MessageEmbed()
        if (!queue || !queue.playing) {
            embed.setDescription(`**Não há nenhum som na fila**`)
            return await msg.edit({ content: null, embeds: [embed] })
        }

        const queueString = queue.tracks.join("\n")
        const currentSong = queue.current

        embed.setDescription("**Tocando**\n" +
            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : None) +
            `\n\n**Lista**\n${queueString}`
        )
            .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setThumbnail(currentSong.thumbnail).setTimestamp()

        msg.edit({ content: null, embeds: [embed] })
    }
}