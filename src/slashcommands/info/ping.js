const slashCommand = require('../../slashCommands')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Responde com pong e mostra o meu ping"
        })
    }
    async run(interaction) {
        await interaction.editReply({ content: "Pong\nPing do bot: `" + this.client.ws.ping + "` ms", ephemeral: true })
    }
}
