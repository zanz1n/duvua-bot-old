const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Exibe o som que está tocando na fila",
        })
    }

    async run(interaction) {
        const queue = this.client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()
        if (!queue || !queue.playing) {
            return embed.setDescription(`**Não há nenhum som na fila!**`),
                await interaction.editReply({ embeds: [embed] })
        }

        const queueString = queue.tracks.join("\n")
        const currentSong = queue.current

        embed.setDescription("**Tocando**\n" +
            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : None) +
            `\n\n**Lista**\n${queueString}`
        )
            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()
            .setThumbnail(currentSong.thumbnail)

        interaction.editReply({ embeds: [embed] })
    }
}