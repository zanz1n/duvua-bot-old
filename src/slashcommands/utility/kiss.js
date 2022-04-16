const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const slashCommand = require('../../slashCommands')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "kiss",
            description: "Beija alguém",
            options: [
                {
                    name: "user",
                    description: "A pessoa que você deseja beijar",
                    type: 6,
                    required: true
                }
            ]
        })
    }
    async run(interaction) {
        let embed = new MessageEmbed()
        const options = interaction.options._hoistedOptions
        const user = options.find((e) => e.name === "user") && options.find((e) => e.name === "user").member.user
        const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
        const links = [
            "https://c.tenor.com/C96g4M5OPsYAAAAC/anime-couple.gif",
            "https://c.tenor.com/ESx85qu8V5QAAAAC/two.gif",
            "https://c.tenor.com/vhuon7swiOYAAAAC/rakudai-kishi-kiss.gif",
            "https://c.tenor.com/s1VvsszCbCAAAAAC/love-you.gif",
            "https://c.tenor.com/hK8IUmweJWAAAAAC/kiss-me-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E.gif",
            "https://c.tenor.com/JwNMk8ggpi8AAAAd/anime-anime-kiss.gif",
            "https://c.tenor.com/kyM-QWHWy1cAAAAC/anime-kissing.gif",
            "https://acegif.com/wp-content/uploads/anime-kiss-6.gif"
        ]
        if (user === this.client.user) {
            embed.setDescription(`**Vamos manter nossa relação como uma amizade, ok ${interaction.user}?**`)
            return interaction.editReply({ content: " ", embeds: [embed] })
        }
        /*else if (user.bot) {
            embed.setDescription(`**Você não pode beijar um bot ${interaction.user}!**`)
            return interaction.editReply({ content: " ", embeds: [embed] })
        }*/
        /*else if (user === interaction.user) {
            embed.setDescription(`**Amor próprio é bom ${interaction.user}, vamos nos amar!**`)
            return interaction.editReply({ content: " ", embeds: [embed] })
        }*/
        else {
            embed.setTitle(`O amor está no ar!  \:heart:`).setDescription(`${interaction.user} beijou ${user}`)
                .setImage(links[random(0, links.length)]).setFooter("🔁 para retribuir  |  ❌ para negar")
            const button = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('1').setLabel('🔁').setStyle('PRIMARY').setDisabled(false),
                new MessageButton().setCustomId('2').setLabel('❌').setStyle('PRIMARY').setDisabled(false)
            )
            await interaction.editReply({ content: " ", embeds: [embed], components: [button] })

            const filter = (btnInt) => {
                return btnInt.user.id === user.id
            }
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 90000 })

            collector.on("collect", async (i) => {
                if (i.customId === '1') {
                    const embedRetribuir = new MessageEmbed().setTitle(`As coisas estão pegando fogo aqui!  \:fire:`)
                        .setDescription(`${i.user} retribuiu o beijo de ${interaction.user}\nSerá que temos um novo casal aqui?  \:heart:`)
                        .setImage(links[random(0, links.length)])

                    await i.reply({ embeds: [embedRetribuir] })
                }
                else if (i.customId === '2') {
                    const slap = [
                        "https://i.pinimg.com/originals/2f/0f/82/2f0f82e4fb0dee8efd75bee975496eab.gif",
                        "https://www.intoxianime.com/wp-content/uploads/2017/04/tumblr_ooub8fIHkT1qz64n4o2_400.gif,",
                        "https://i.pinimg.com/originals/65/57/f6/6557f684d6ffcd3cd4558f695c6d8956.gif",
                        "https://c.tenor.com/T6PzZiyIV6AAAAAC/tapa-anime-bosta-tapa.gif"
                    ]
                    const embedRetribuir = new MessageEmbed().setTitle(`Quem nunca levou um fora, né ${interaction.user.username}`)
                        .setDescription(`${i.user} negou o beijo de ${interaction.user}  \:broken_heart:`)
                        .setImage(slap[random(0, slap.length)])

                    await i.reply({ embeds: [embedRetribuir] })
                }
            })
        }
    }
}
