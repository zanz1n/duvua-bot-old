const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Responde com pong e mostra o ping do bot",
    async execute(client, message, args) {
        const embed = new MessageEmbed().setDescription("**Pong!\nPing do bot: " + client.ws.ping + " ms**")
        await message.reply({ content: null, embeds: [embed] })
    }
}