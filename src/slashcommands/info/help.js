const slashCommand = require('../../structures/slashCommands')
const { Client, Interaction } = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Exibe as funções e os comandos do bot"
        })
    }
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     * @param {string[]} args
     */
    async run(interaction) {
        const client = this.client
        let embed = new MessageEmbed()
        const find = (command) => {
            return this.client.slashCommands.find(c => c.name === command).description
        }
        embed.setTitle("Help")
            .setDescription(`
            **${this.client.user} pode fazer muitas coisas para o seu servidor.**
            O que inclui tocar músicas, ver avatar de usuários, beijar alguém e até fazer um meme, confira todos os comandos do bot abaixo:\n
            **\:globe_with_meridians: - slash commands | \:m: - legacy commands**\n
            \:globe_with_meridians: - digite:  **/**  para ver as opções; \:m: - podem ser usados com o prefixo:  **${interaction.guild.db.prefix}** no chat`)

            .addField("ℹ️ Categorias", "**Para visualizar todas as categorias e comandos use a caixa de seleção abaixo.**")
            //imutable
            //end of imutable
            .setThumbnail(this.client.user.displayAvatarURL())

            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu().setCustomId('1').setPlaceholder('Escolha a categoria').setMinValues(1).setMaxValues(1)
                .addOptions([
                    { label: "Fun", value: "fun", description: "Comandos para descontrair", emoji: "🥳" },
                    { label: "Info", value: "info", description: "Comandos para ver informações sobre o bot", emoji: "ℹ️" },
                    { label: "Moderation / Utility", value: "mod-util", description: "Comandos para auxiliar na moderação e organização do server", emoji: "🖋️" },
                    { label: "Music", value: "music", description: "Comandos para tocar musicas do youtube", emoji: "🎧" },
                    { label: "Money / Level", value: "money", description: "Comandos relacionados ao sistema monetário e de ranks do bot", emoji: "💸" },
                ])
        )

        const filter = (i) => i.isSelectMenu() && i.user.id === interaction.user.id

        const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000 })

        collector.on("collect", async (i) => {
            const values = i.values[0]
            if (values === "fun") {
                const funEmbed = new MessageEmbed().addField("🥳 Fun", "Comandos for fun e de diversão em geral.")
                    .addField("\:globe_with_meridians: kiss", find("kiss"), true).addField("\:globe_with_meridians:\:m: avatar", find("avatar"), true)
                    .addField("\:m: bruno", "Não falamos do Bruno", true)

                i.deferUpdate()
                interaction.editReply({ content: null, embeds: [funEmbed] })
            }
            else if (values === "info") {
                const infoEmbed = new MessageEmbed().addField("ℹ️ Info", "Comandos de inforomação em geral.")
                    .addField("\:globe_with_meridians:\:m: ping", find("ping"), true).addField("\:globe_with_meridians: info", find("info"), true)
                    .addField("\:globe_with_meridians:\:m: help", find("help"), true).addField("\:globe_with_meridians:\:m: anime", find("anime"), true)
                    .addField("\:globe_with_meridians: github", find("github"), true).addField("*", "*", true)

                i.deferUpdate()
                interaction.editReply({ content: null, embeds: [infoEmbed] })
            }
            else if (values === "mod-util") {
                const modUtilEmbed = new MessageEmbed().addField("🖋️ Utilidade / Moderação", "Comandos para auxiliar na moderação e organização do server.")
                    .addField("\:globe_with_meridians:\:m: embed", find("embed"), true).addField("\:globe_with_meridians:\:m: say", find("say"), true)
                    .addField("\:globe_with_meridians: clear", find("clear"), true).addField("\:globe_with_meridians: ban", find("ban"), true)
                    .addField("\:globe_with_meridians: config wellcome", "Altera a mensagem de boas vindas", true)
                    .addField("\:globe_with_meridians: config prefix", "Altera o prefixo do bot no servidor", true)

                    .addField("\:information_source: Dica", "**Nos comandos say e embed, use /n para quebrar linha.**")

                i.deferUpdate()
                interaction.editReply({ content: null, embeds: [modUtilEmbed] })
            }
            else if (values === "music") {
                const musicEmbed = new MessageEmbed().addField("🎧 Música", "Todos os comandos relacionados a músicas.")
                    .addField("\:globe_with_meridians:\:m: play", find("play"), true).addField("\:globe_with_meridians:\:m: queue", find("queue"), true)
                    .addField("\:globe_with_meridians: pause", find("pause"), true).addField("\:globe_with_meridians: resume", find("resume"), true)
                    .addField("\:globe_with_meridians:\:m: skip", find("skip"), true).addField("\:globe_with_meridians:\:m: songinfo", find("songinfo"), true)
                    .addField("\:globe_with_meridians:\:m: stop", find("stop"), true).addField("*", "*", true).addField("*", "*", true)

                i.deferUpdate()
                interaction.editReply({ content: null, embeds: [musicEmbed] })
            }
            else if (values === "money") {
                const moneyEmbed = new MessageEmbed().addField("💸 Dinheiro", "Todos os comandos relacionados ao sistema monetário.")
                    .addField("\:globe_with_meridians:\:m: coins", find("coins"), true).addField("\:globe_with_meridians: \:m: work", find("work"), true)
                    .addField("\:globe_with_meridians:\:m: level", find("level"), true)

                i.deferUpdate()
                interaction.editReply({ content: null, embeds: [moneyEmbed] })
            }

        })
        await interaction.editReply({ embeds: [embed], components: [row] })
    }
} //.addField("*", "*", true)
