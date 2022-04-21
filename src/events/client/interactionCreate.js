const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate"
        })
    }
    run = async (interaction) => {

        if (!interaction.isCommand || interaction.user.bot) return
        const cmd = await this.client.slashCommands.find(c => c.name === interaction.commandName)

        if (!cmd) return

        const ephemeral = (string) => interaction.commandName === string //boolean

        if (ephemeral("help") || ephemeral("info")) {
            await interaction.deferReply({ ephemeral: true })
        } else {
            await interaction.deferReply()
        }
        cmd.run(interaction)
    }
}
