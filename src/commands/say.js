module.exports = {
    name: "say",
    description: "Diz o que é dito para dizer",
    async execute(client, message, args) {
        if (args === undefined) return message.reply(`Você precisa inserir uma mensagem ${message.author}`)
        await message.channel.send(`${args}\n-${message.author}`)
    }
}