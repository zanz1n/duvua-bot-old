const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "coins",
    description: "Mostra as moedas que você possui",
    async execute(client, message, args) {

        const embed = new MessageEmbed().setDescription(`\:moneybag:  **Você possui ${message.author.db.gold_coins} \:coin:  moedas de ouro e ${message.member.db.silver_coins} \:hole:  moedas de prata.**
        **\:money_with_wings:  Use /work para trabalhar e ganhar moedas.**
        Moedas de ouro valem em todos os servidores e moedas de prata apenas nesse.`)

        message.reply({ content: null, embeds: [embed] })
    }
}
