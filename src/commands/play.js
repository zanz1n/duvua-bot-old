const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "play",
    description: "Toca uma música do youtube",
    async execute(client, message, args) {
        if (!message.member.voice.channel) {
            return message.reply("```diff\n-Você prefisa estart em um VC para tocar uma música\n```")
        }
        const queue = await client.player.createQueue(message.guild)
        if (!queue.connection) await queue.connect(message.member.voice.channel)

        let embed = new MessageEmbed()

        if (args.length > 75) { //args
            return embed.setDescription("**Acalme-se, texto é muito grande para mim**"),
                message.reply({ embeds: [embed] })
        }

        let url = args //args[0]
        var result = await client.player.search(url, {
            requestedBy: message.author,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })

        if (result.tracks.length == 0) {
            result = await client.player.search(url, {
                requestedBy: message.author,
                searchEngine: QueryType.YOUTUBE_SEARCH
            })

            if (result.tracks.length == 0) {
                return embed.setDescription(`**Nenhum som:** *${args}* **encontrado**`),
                    message.reply({ embeds: [embed] })
            }
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        embed.setDescription(`**[${song.title}](${song.url})** foi adicionada a playlist\n\n**Duração: [${song.duration}]**`)
            .setThumbnail(song.thumbnail).setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: await message.author.displayAvatarURL() })

        if (!queue.playing) await queue.play()

        await message.channel.send({ embeds: [embed] })
    }
}