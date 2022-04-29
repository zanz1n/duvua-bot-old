const slashCommand = require('../../structures/slashCommands')
const Bot = require('../../structures/Client')
const { MessageEmbed, Interaction } = require('discord.js')
const fetch = require('node-fetch')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "github",
            description: "Exibe informações de um perfil no github",
            options: [
                {
                    name: "usuario",
                    description: "O nome de usuario do perfil",
                    type: 3,
                    required: true
                }
            ]
        })
    }
    /**
     * @param {Bot} this.client 
     * @param {Interaction} interaction
     */
    async run(interaction) {
        const embed = new MessageEmbed()

        const userName = interaction.options.getString('usuario')
        interaction.editReply({ content: `**\`Procurando por "${userName}" [...]\`**` })

        fetch(`https://api.github.com/users/${userName}`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        }).then((res) => {
            return res.json()
        }).then((user) => {
            if (!user.login) {
                embed.setDescription(`**Usuário não encontrado**`)
            }
            else {
                const createdat = user.created_at.replace("-", "/").replace("-", "/").replace("T", " às ").replace("Z", "").slice(0, 10)
                const updatedat = user.updated_at.replace("-", "/").replace("-", "/").replace("T", " às ").replace("Z", "").slice(0, 10)

                embed.setAuthor("Github de " + user.login, user.avatar_url)
                    .setDescription(`[Link do perfil](${user.html_url})\n` +
                        "**Informações coletadas diretamente do github, todas as informações exibidas são públicas a todos que acessam o site.**\n"
                    )
                    .setThumbnail(user.avatar_url)
                    .addField("ℹ️ Tipo", `${user.type.replace("Organization", "Organização").replace("User", "Usuário")}`, true)
                    .addField("✅ Seguindo", `${user.followers}`, true).addField("🔁 Seguidores", `${user.following}`, true)
                    .addField("💾 Repositórios", `${user.public_repos}`, true).addField("📅 Criado em", `${createdat}`, true)
                    .addField("📅 Atualizado em", `${updatedat}`, true).addField("🙇 Nome", user.name || "N/A", true)
                    .addField("📧 Email", user.email || "N/A", true).addField("🏭 Organização", user.company || "N/A", true)
                    .addField("📜 Bio", user.bio || "O usuário não possui nenhuma bio")
            }

            interaction.editReply({ content: null, embeds: [embed] })
        }).catch((err) => {
            if (err) {
                embed.setDescription(`**Usuário não encontrado**`)
                interaction.editReply({ content: null, embeds: [embed] })
            }
        })
    }
}
