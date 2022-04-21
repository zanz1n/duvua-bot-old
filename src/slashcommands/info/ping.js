const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Responde com pong e mostra o meu ping"
        })
    }
    async run(interaction) {
        const embed = new MessageEmbed().setDescription("**Pong!\nPing do bot: " + this.client.ws.ping + " ms**")
        await interaction.editReply({ content: null, embeds: [embed] })
    }
}
