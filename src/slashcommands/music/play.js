const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Toca uma música do youtube",
            options: [{
                name: "song",
                description: "O link ou o nome da música",
                type: 3,
                required: true
            }
            ]
        })
    }

    async run(interaction) {
        if (!interaction.member.voice.channel) {
            return interaction.editReply({ content: "```diff\n-Você prefisa estart em um VC para tocar uma música\n```", ephemeral: true })
        }
        const queue = await this.client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getString("song").length > 75) {
            return embed.setDescription("**Acalme-se, texto é muito grande para mim**"),
                interaction.editReply({ embeds: [embed] })
        }

        let url = interaction.options.getString("song")
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
                return embed.setDescription(`**Nenhum som:** *${interaction.options.getString("song")}* **encontrado**`),
                    interaction.editReply({ embeds: [embed] })
            }
        }

        const song = result.tracks[0]
        await queue.addTrack(song)

        embed.setDescription(`**[${song.title}](${song.url})** foi adicionada a playlist\n\n**Duração: [${song.duration}]**`)
            .setThumbnail(song.thumbnail).setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })

        if (!queue.playing) await queue.play()

        await interaction.editReply({ embeds: [embed] })
    }
}