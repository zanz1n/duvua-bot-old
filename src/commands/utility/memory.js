const { memoryUsage } = require('process')

module.exports = {
    name: "memory",
    description: "Exibe o uso de ram do bot",
    async execute(client, message, args) {
        if (message.author.id != "586600481959182357") return message.reply("Desculpe, mas apenas meu dono pode usar esse comando")
        await message.channel.send("logs:\n```diff\n-[bot-api] memoryUsage: " + `${parseInt(memoryUsage().heapTotal / 1024 ** 2)}(USED)` + " / " + `${parseInt(memoryUsage().rss / 1024 ** 2)}(ALOCATED)` + " MB\n```")
    }
}