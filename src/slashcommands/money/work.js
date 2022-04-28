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
     * @param {Interaction} interaction 
     * @param {Bot} this.client
     */
    async run(interaction) {
        const embed = new MessageEmbed()

        const sinceRequestMS = (new Date() - interaction.user.db.last_daily_request)
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

            console.log(Date.now())
            embed.setDescription(`**Você precisa esperar mais ${formatData} para trabalhar de novo.**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        interaction.user.db.last_daily_request = new Date()

        console.log(sinceRequestMS)
        const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
        const gold_coins = random(1, 5)
        const silver_coins = random(10, 50)
        embed.setDescription(`\:moneybag:  **Você trabalhou como ${interaction.user.db.job} e ganhou ${gold_coins} \:coin:  moedas de ouro e ${silver_coins} \:hole:  moedas de prata**
        Você agora possui ${interaction.user.db.gold_coins + gold_coins} \:coin:  moedas de ouro e ${interaction.member.db.silver_coins + silver_coins} \:hole:  moedas de prata`)

        interaction.user.db.gold_coins += gold_coins
        interaction.member.db.silver_coins += silver_coins
        interaction.user.db.save()
        interaction.member.db.save()

        interaction.editReply({ content: null, embeds: [embed] })
    }
}
