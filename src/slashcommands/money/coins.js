const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const Bot = require('../../structures/Client')
const { Interaction } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "coins",
            description: "Mostra as moedas que você possui"
        })
    }
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Bot} this.client
     * 
     */
    async run(interaction) {
        const embed = new MessageEmbed().setDescription(`\:moneybag:  **Você possui ${interaction.user.db.gold_coins} \:coin:  moedas de ouro e ${interaction.member.db.silver_coins} \:hole:  moedas de prata.**
        **\:money_with_wings:  Use /work para trabalhar e ganhar moedas.**
        Moedas de ouro valem em todos os servidores e moedas de prata apenas nesse.`)

        interaction.editReply({ content: null, embeds: [embed] })
    }
}
