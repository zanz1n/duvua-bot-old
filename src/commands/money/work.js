const { MessageEmbed } = require('discord.js')
const Bot = require('../../structures/Client')

module.exports = {
    name: "work",
    description: "Você trabalha e obtem dinheiro em troca",

    async execute(client, message, args) {
        const embed = new MessageEmbed()

        const sinceRequestMS = (new Date() - message.author.db.last_daily_request)

        if (sinceRequestMS < 10800000) {
            const timeOut = 10800000 - sinceRequestMS
            const hour = parseInt(timeOut / 3600000)
            const minutes = parseInt(timeOut / 60000 - hour * 60)
            const seconds = parseInt(timeOut / 1000 - minutes * 60 - hour * 3600)

            let formatData

            if (hour != 0) {
                formatData = `\`${hour}h:${minutes}m:${seconds}s\``
            } if (hour == 0 || !hour) {
                formatData = `\`${minutes}m:${seconds}s\``
            } if (minutes == 0) {
                formatData = `\`${seconds}s\``
            }

            embed.setDescription(`**Você precisa esperar mais ${formatData} para trabalhar de novo.**`)

            return await message.reply({ content: null, embeds: [embed] })
        }

        message.author.db.last_daily_request = new Date()

        const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

        const gold_coins = random(1, 5)
        const silver_coins = random(10, 50)

        embed.setDescription(`\:moneybag:  **Você trabalhou como ${message.author.db.job} e ganhou ${gold_coins} \:coin:  moedas de ouro e ${silver_coins} \:hole:  moedas de prata**
        Você agora possui ${message.author.db.gold_coins + gold_coins} \:coin:  moedas de ouro e ${message.member.db.silver_coins + silver_coins} \:hole:  moedas de prata`)

        message.author.db.gold_coins += gold_coins
        message.member.db.silver_coins += silver_coins

        message.author.db.save()
        message.member.db.save()

        message.reply({ content: null, embeds: [embed] })
    }
}
