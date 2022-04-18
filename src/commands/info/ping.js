module.exports = {
    name: "ping",
    description: "Responde com pong e mostra o ping do bot",
    async execute(client, message, args) {
        await message.channel.send("Pong!\nPing do bot: `" + client.ws.ping + "` ms")
    }
}