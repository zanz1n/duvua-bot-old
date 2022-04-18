const { MessageEmbed } = require('discord.js')
const malScraper = require('mal-scraper')
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "anime",
    description: "Procura por um anime na internet",
    async execute(client, message, args) {
        const embed = new MessageEmbed()

        const req = args.split(/\s+/g).join(" ").toLowerCase()

        if (req.length > 80) return embed.setDescription(`**Não insira um nome com mais de 80 caracteres ${message.author.username}!**`),
            await message.reply({ embeds: [embed] }),
            message.delete()

        const msg = await message.channel.send({ content: `\`Carregando [${req} ]\`` })

        await msg.edit({ content: `**\`Procurando por "${req}" [...]\`**` })

        malScraper.getInfoFromName(req).then(async data => {
            const trad = await translate(data.synopsis.slice(0, 768), {
                to: "portuguese"
            })
            embed.setDescription(`**[${data.title}  ${data.japaneseTitle}](${data.url})**`).setThumbnail(data.picture)
                .setTitle(`${data.ranked} ${data.englishTitle || data.title}`)

                .addField("Exibição:", `${data.aired.replace("to", "até")}`, true).addField("Generos:", `${data.genres}`, true)
                .addField("Studio:", `${data.studios}`, true).addField("Episódios:", `${data.episodes}`, true)
                .addField("Score:", `${data.score}`, true).addField("Status:", `${data.status}`, true)

                .addField("Sinopse:", `${trad.text.replace("[Escrito por MAL Rewrite]", " ").slice(0, 560)} [...]\n`)
                .addField("\n**[Escrito por MAL Rewrite]**", `A sinopse acima está limitada à 560 linhas para não ocupar muito espaço em sua tela, para ver a original clique **[aqui](${data.url}).**\n`, true)

                .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() }).setTimestamp()

            await msg.edit({ content: " ", embeds: [embed] })

        }).catch(async err => {
            if (message.author.id === "586600481959182357") return await msg.edit({ content: `Nenhum anime com nome ${req} foi encontrado\n\`${err}\`` })
            await msg.edit({ content: `Nenhum anime com nome "${req}" foi encontrado` })
        })
    }
}