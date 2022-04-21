const { MessageEmbed } = require('discord.js')
const slashCommand = require('../../structures/slashCommands')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Exibe o avatar de alguém",
            options: [
                {
                    name: "pessoa",
                    description: "De quem você deseja exibir o avatar",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async run(interaction) {
        const options = interaction.options._hoistedOptions
        const user = (options.find((e) => e.name === "pessoa") && options.find((e) => e.name === "pessoa").member.user) || interaction.user
        const member = (options.find((e) => e.name === "pessoa") && options.find((e) => e.name === "pessoa").memebr) || interaction.member

        const embed = new MessageEmbed().setColor(member.displayHexColor)
        const image = user.displayAvatarURL({ dynamic: true, size: 2048 })

        embed.setAuthor("Avatar de " + user.username, user.displayAvatarURL()).setImage(image)
            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp().setDescription(`**Clique [aqui](${user.displayAvatarURL({ format: 'png' })}) para ver original!**`)
        await interaction.editReply({ embeds: [embed] })
    }
}