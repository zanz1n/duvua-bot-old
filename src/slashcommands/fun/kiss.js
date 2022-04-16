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

        const links = require('../../gifs/gifs').gifs_a

        if (user === this.client.user) {
            embed.setDescription(`**Vamos manter nossa relação como uma amizade, ok ${interaction.user}?**`)
            return interaction.editReply({ content: " ", embeds: [embed] })
        }
        /*else if (user.bot) {
            embed.setDescription(`**Você não pode beijar um bot ${interaction.user}!**`)
            return interaction.editReply({ content: " ", embeds: [embed] })
        }*/ //do not permit kissing bots
        else if (user === interaction.user) {
            embed.setTitle(`O amor está no ar!  \:heart:`).setDescription(`${interaction.user} beijou ${user}`)
                .setImage(links[random(0, links.length)])
            return interaction.editReply({ content: " ", embeds: [embed] })
        }
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
                    const slap = require('../../gifs/gifs').gifs_b
                    const embedRetribuir = new MessageEmbed().setTitle(`Quem nunca levou um fora, né ${interaction.user.username}`)
                        .setDescription(`${i.user} negou o beijo de ${interaction.user}  \:broken_heart:`)
                        .setImage(slap[random(0, slap.length)])

                    await i.reply({ embeds: [embedRetribuir] })
                }
            })
        }
    }
}

/*
 *
 *
 *          "https://c.tenor.com/ESx85qu8V5QAAAAC/two.gif",
 *          "https://c.tenor.com/vhuon7swiOYAAAAC/rakudai-kishi-kiss.gif",
 *          "https://c.tenor.com/s1VvsszCbCAAAAAC/love-you.gif",
 *          "https://c.tenor.com/hK8IUmweJWAAAAAC/kiss-me-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E.gif",
 *          "https://c.tenor.com/JwNMk8ggpi8AAAAd/anime-anime-kiss.gif",
 *          "https://c.tenor.com/kyM-QWHWy1cAAAAC/anime-kissing.gif",
 *          "https://acegif.com/wp-content/uploads/anime-kiss-6.gif"
 *
 * 
 */