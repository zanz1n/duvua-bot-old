const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const Bot = require('../../structures/Client')
const { Interaction } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "work",
            description: "Você trabalha e obtem dinheiro em troca"
        })
    }
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Bot} this.client
     * 
     */
    async run(interaction) {
        const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
        const gold_coins = random(1, 5)
        const silver_coins = random(10, 50)
        const embed = new MessageEmbed().setDescription(`\:moneybag:  **Você trabalhou como ${interaction.user.db.job} e ganhou ${gold_coins} \:coin:  moedas de ouro e ${silver_coins} \:hole:  moedas de prata**
        Você agora possui ${interaction.user.db.gold_coins + gold_coins} \:coin:  moedas de ouro e ${interaction.member.db.silver_coins + silver_coins} \:hole:  moedas de prata`)

        interaction.user.db.gold_coins += gold_coins
        interaction.member.db.silver_coins += silver_coins
        interaction.user.db.save()
        interaction.member.db.save()

        interaction.editReply({ content: null, embeds: [embed] })
    }
}
