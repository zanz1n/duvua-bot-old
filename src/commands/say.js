module.exports = {
    name: "say",
    description: "Diz o que é dito para dizer",
    async execute(message, args) {
        await message.channel.send(`${args[0]}\n-${message.author}`)
    }
}