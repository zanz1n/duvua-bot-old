const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "play",
    description: "Toca uma música do youtube",
    async execute(client, message, args) {
        let embed = new MessageEmbed()

        const msg = await message.channel.send({ content: `\`Carregando [${message.content.replace(client.prefix + "play", "")} ]\`` })
        if (!message.member.voice.channel) {
            embed.setDescription(`**Você prefisa estart em um canal de voz para tocar uma música, ${message.author.username}**`)
            return msg.edit({ content: null, embeds: [embed] })
        }
        const queue = await client.player.createQueue(message.guild)
        if (!queue.connection) await queue.connect(message.member.voice.channel)

        if (args.length > 80) { //args
            embed.setDescription(`**Não pesquiso por títulos com mais de 80 caracteres, ${message.author.username}**`)
            return msg.edit({ content: null, embeds: [embed] })
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
                embed.setDescription(`**Nenhum som "${args}" encontrado, ${message.author.username}**`)
                return msg.edit({ content: null, embeds: [embed] })
            }
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        embed.setDescription(`**[${song.title}](${song.url})** foi adicionada a playlist\n\n**Duração: [${song.duration}]**`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: await message.author.displayAvatarURL() }).setTimestamp()

        if (!queue.playing) await queue.play()

        await msg.edit({ content: " ", embeds: [embed] })
    }
}