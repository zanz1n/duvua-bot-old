const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Toca uma música do youtube",
            options: [
                {
                    name: "som",
                    description: "O link ou o nome da música",
                    type: 3,
                    required: true
                }
            ]
        })
    }

    async run(interaction) {
        let embed = new MessageEmbed()

        if (!interaction.member.voice.channel) {
            embed.setDescription(`**Você prefisa estart em um canal de voz para tocar uma música, ${interaction.user.username}**`)
            return interaction.editReply({ content: null, embeds: [embed] })
        }
        const queue = await this.client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        if (interaction.options.getString("som").length > 80) {
            embed.setDescription(`**Não pesquiso por títulos com mais de 80 caracteres, ${interaction.user.username}**`)
            return interaction.editReply({ content: null, embeds: [embed] })
        }

        let url = interaction.options.getString("som")
        var result = await this.client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.YOUTUBE_VIDEO
        })

        if (result.tracks.length == 0) {
            result = await this.client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_SEARCH
            })

            if (result.tracks.length == 0) {
                embed.setDescription(`**Nenhum som "${interaction.options.getString("som")}" encontrado, ${message.author.username}**`)
                return interaction.editReply({ content: null, embeds: [embed] })
            }
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        embed.setDescription(`**[${song.title}](${song.url})** foi adicionada a playlist\n\n**Duração: [${song.duration}]**`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()

        if (!queue.playing) await queue.play()

        await interaction.editReply({ embeds: [embed] })
    }
}