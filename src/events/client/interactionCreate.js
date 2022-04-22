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
        interaction.guild.db = await this.client.db.guilds.findById(interaction.guild.id) ||
            new this.client.db.guilds({ _id: interaction.guild.id, name: interaction.guild.name });

        interaction.guild.db.name = interaction.guild.name
        interaction.guild.db.save()

        const ephemeral = (string) => interaction.commandName === string //boolean

        if (ephemeral("help") || ephemeral("info")) {
            await interaction.deferReply({ ephemeral: true })
        } else {
            await interaction.deferReply()
        }
        cmd.run(interaction)
    }
}
