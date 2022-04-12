const Event = require('../../Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate"
        })
    }
    run = async (interaction) => {
        if (!interaction.isCommand || interaction.user.bot) return
        const cmd = this.client.slashCommands.find(c => c.name === interaction.commandName)
        if (cmd) {
            await interaction.deferReply()
            cmd.run(interaction)
        }
    }
}