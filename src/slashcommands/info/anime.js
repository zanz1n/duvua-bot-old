const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')
const Kitsu = require('kitsu')
const aq = require('animequote')
const fetch = require('node-fetch')
const malScraper = require('mal-scraper')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "anime",
            description: "Procura por um anime na internet",
            options: [
                {
                    name: "nome",
                    description: "Nome do anime que deseja buscar",
                    type: 3,
                    required: true
                }
            ]
        })
    }
    async run(interaction) {
        const api = new Kitsu()
        const embed = new MessageEmbed()

        const req = interaction.options.getString('nome').split(/\s+/g).join(" ").toLowerCase()//.replace(" ", "-")
        if (req.length > 80) {
            return interaction.editReply({ content: "Não insira um nome com mais de 80 caracteres." })
        }
        malScraper.getInfoFromName(req).then(async data => {
            embed.setDescription(`**[${data.title}  ${data.japaneseTitle}](${data.url})**`).setThumbnail(data.picture)
                .setTitle(`${data.ranked} ${data.englishTitle || data.title}`)

                .addField("Exibição:", `${data.aired.replace("to", "até")}`, true).addField("Generos:", `${data.genres}`, true)
                .addField("Studio:", `${data.studios}`, true).addField("Episódios:", `${data.episodes}`, true)
                .addField("Score:", `${data.score}`, true).addField("Status", `${data.status}`, true)

                .addField("Sinopse:", `${data.synopsis.slice(0, 520)} [...]`)
                .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()
            console.log(data)
            await interaction.editReply({ content: " ", embeds: [embed] })
        }).catch(async err => {
            if (interaction.user.id === "586600481959182357") return await interaction.editReply({ content: `Nenhum anime com nome ${req} foi encontrado\n\`${err}\`` })
            await interaction.editReply({ content: `Nenhum anime com nome "${req}" foi encontrado` })
        })
    }
} //.addField("", ``, true)