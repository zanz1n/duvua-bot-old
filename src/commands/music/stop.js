const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
const { Permissions } = require('discord.js')

module.exports = {
    name: "stop",
    description: "Para o bot e limpa a fila de reprodução",
    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guildId)

        let embed = new MessageEmbed()
        if (!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${message.author.username}**`)
            return await message.channel.send({ content: null, embeds: [embed] })
        }
        if (!queue) {
            embed.setDescription(`**Não há nenhum som na fila,  ${message.author.username}**`)
            return await message.channel.send({ content: null, embeds: [embed] })
        }

        queue.destroy()

        embed.setDescription(`**A fila foi limpa por ${message.author.username}**`)
        await message.channel.send({ content: null, embeds: [embed] })
    }
}
