module.exports = {
    name: "bruno",
    description: "Não falamos do bruno",
    async execute(client, message, args) {
        await message.channel.send(`Não falamos do bruno ${message.author}`)
    }
}