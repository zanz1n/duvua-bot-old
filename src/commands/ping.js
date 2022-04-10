module.exports = {
    name: "ping",
    description: "Responde com pong e mostra o ping do bot",
    async execute(message, args) {
        await message.channel.send("Pong\nBot-heap-ping:")
    }
}