const Bot = require('../../structures/Client')
const { Interaction } = require('discord.js')
const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate"
        })
    }
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Bot} this.client
     * 
     */
    run = async (interaction) => {
        if (interaction.user.bot) return

        interaction.guild.db = await this.client.db.guilds.findById(interaction.guild.id) ||
            new this.client.db.guilds({ _id: interaction.guild.id, name: interaction.guild.name });

        interaction.guild.db.name = interaction.guild.name
        interaction.guild.db.save()

        if (interaction.isCommand) {
            const cmd = await this.client.slashCommands.find(c => c.name === interaction.commandName)

            if (!cmd) return

            const ephemeral = (string) => interaction.commandName === string //boolean

            if (ephemeral("info")) {
                await interaction.deferReply({ ephemeral: true })
            } else {
                await interaction.deferReply()
            }
            cmd.run(interaction).catch((err) => {
                if (err) console.log("\x1b[31m[bot-err] something whent wrong trying to execute a slashCommand\x1b[0m\n",
                    err,
                    "\n\x1b[33m[bot-api] this may affect the usability of the bot\x1b[0m"
                )
            })
        }
    }
}
