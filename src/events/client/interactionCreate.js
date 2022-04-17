const Event = require('../../Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate"
        })
    }
    run = async (interaction) => {

        if (!interaction.isCommand || interaction.user.bot) return
        const cmd = await this.client.slashCommands.find(c => c.name === interaction.commandName)
        const ephemeral = (string) => interaction.commandName === string //boolean

        if (ephemeral("help") || ephemeral("info")) {
            await interaction.deferReply({ ephemeral: true })

        } else {
            await interaction.deferReply()
        }
        cmd.run(interaction)
    }
}
/*
 *catch (err) {
            if (interaction.user.id === "586600481959182357") return interaction.editReply({ content: "```diff\n-Erro: algo de errado aconteceu durante a execução desse comando!\n```" + `\`\n${err}\`` })
            interaction.editReply({ content: "```diff\n-Erro: algo de errado aconteceu durante a execução desse comando!\n```" })
        }
 *
 * 
 * 
 * 
 * 
 */