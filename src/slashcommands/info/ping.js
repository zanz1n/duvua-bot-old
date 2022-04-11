const slashCommand = require('../../slashCommands')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Responde com pong e mostra o ping do bot"
        })
    }
    run = (interaction) => {
        interaction.reply({ content: "Pong\nPing do bot: `" + this.client.ws.ping + "` ms", ephemeral: true })
    }
}
