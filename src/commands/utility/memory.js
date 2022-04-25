const { memoryUsage } = require('process')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "memory",
    description: "Exibe o uso de ram do bot",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        if (message.author.id != "586600481959182357") {
            embed.setDescription(`**Desculpe, mas apenas meu dono pode usar esse comando,  ${message.author.username}**`)
            return await message.reply({ embeds: [embed] })
        }
        await message.channel.send("logs:\n```diff\n-[bot-api] memoryUsage: " + `${parseInt(memoryUsage().heapTotal / 1024 ** 2)}(USED)` + " / " + `${parseInt(memoryUsage().rss / 1024 ** 2)}(ALOCATED)` + " MB\n```")
    }
}
