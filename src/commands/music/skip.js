const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "skip",
    description: "Pula a música que está tocando",
    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guildId)

        let embed = new MessageEmbed()

        if (!queue) {
            return embed.setDescription(`**Não há nenhum som na fila,  ${message.author.username}**`),
                await message.channel.send({ embeds: [embed] })
        }
        queue.skip()

        embed.setDescription(`**Música** ${queue.current.title} **pulada por ${message.author.username}**`)
        await message.channel.send({ embeds: [embed] })
    }
}