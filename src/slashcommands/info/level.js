const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const Bot = require('../../structures/Client')
const { Interaction } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Mostra o seu level de interação no servidor"
        })
    }
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Bot} this.client
     * 
     */
    async run(interaction) {
        const meta = 3 * (interaction.user.db.level ** 2)
        const embed = new MessageEmbed().setDescription(`**Seu level atual no servidor ${interaction.guild.name} é ${interaction.user.db.level}**
        Seu progresso para atingir o level ${interaction.user.db.level + 1} é ${interaction.user.db.xp}/${meta} pontos!`
        )

        interaction.editReply({ content: null, embeds: [embed] })
    }
}
