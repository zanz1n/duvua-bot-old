const Bot = require('../../structures/Client')
const { Message } = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')

module.exports = {
    name: "help",
    description: "Diz o que é dito para dizer",
    /**
     * @param {Bot} client
     * @param {Message} message
     * @param {string[]} args
     */
    async execute(client, message, args) {
        const msg = await message.channel.send({ content: `\`Pensando [...]\`` })
        let embed = new MessageEmbed()
        const find = (command) => {
            return client.slashCommands.find(c => c.name === command).description
        }
        embed.setTitle("Help")
            .setDescription(`**${client.user} pode fazer muitas coisas para o seu servidor.**\nO que inclui tocar músicas, ver avatar de usuários, beijar alguém e até fazer um meme, confira todos os comandos do bot abaixo:\n\n**\:globe_with_meridians: - slash commands | \:m: - legacy commands**\n\n\:globe_with_meridians: - digite:  **/**  para ver as opções; \:m: - podem ser usados com o prefixo:  **${message.guild.db.prefix}**  no chat`)

            .addField("Categorias", "```diff\n+Para visualizar todas as categorias e comandos use a caixa de seleção abaixo.\n```")
            //imutable
            //end of imutable
            .setThumbnail(client.user.displayAvatarURL())

            .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() }).setTimestamp()

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu().setCustomId('1').setPlaceholder('Escolha a categoria').setMinValues(1).setMaxValues(1)
                .addOptions([
                    { label: "Config", value: "config", description: "Comandos para configurar o bot no servidor", emoji: "⚙️" },
                    { label: "Fun", value: "fun", description: "Comandos para descontrair", emoji: "🥳" },
                    { label: "Info", value: "info", description: "Comandos para ver informações sobre o bot", emoji: "ℹ️" },
                    { label: "Moderation / Utility", value: "mod-util", description: "Comandos para auxiliar na moderação e organização do server", emoji: "🖋️" },
                    { label: "Music", value: "music", description: "Comandos para tocar musicas do youtube", emoji: "🎧" },
                ])
        )

        const filter = (i) => i.isSelectMenu() && i.user.id === message.author.id

        const collector = await message.channel.createMessageComponentCollector({ filter, time: 60000 })

        await msg.edit({ embeds: [embed], components: [row] })

        collector.on("collect", async (i) => {
            const values = i.values[0]
            if (values === "config") {
                const configEmbed = new MessageEmbed().addField("Config", "Comandos para configurar o bot no servidor.")
                    .addField("\:globe_with_meridians: config wellcome", "Altera a mensagem de boas vindas", true)
                    .addField("\:globe_with_meridians: config prefix", "Altera o prefixo do bot", true)
                    .addField("*", "*", true)

                i.deferUpdate()
                msg.edit({ content: null, embeds: [configEmbed] })
            }
            else if (values === "fun") {
                const funEmbed = new MessageEmbed().addField("Fun", "Comandos for fun e de diversão em geral.")
                    .addField("\:globe_with_meridians: kiss", find("kiss"), true).addField("\:globe_with_meridians:\:m: avatar", find("avatar"), true)
                    .addField("\:m: bruno", "Não falamos do Bruno", true)

                i.deferUpdate()
                msg.edit({ content: null, embeds: [funEmbed] })
            }
            else if (values === "info") {
                const infoEmbed = new MessageEmbed().addField("Info", "Comandos de inforomação em geral.")
                    .addField("\:globe_with_meridians:\:m: ping", find("ping"), true).addField("\:globe_with_meridians: info", find("info"), true)
                    .addField("\:globe_with_meridians:\:m: help", find("help"), true).addField("\:globe_with_meridians:\:m: anime", find("anime"), true)
                    .addField("\:globe_with_meridians:\:m: level", find("level"), true).addField("*", "*", true)

                i.deferUpdate()
                msg.edit({ content: null, embeds: [infoEmbed] })
            }
            else if (values === "mod-util") {
                const configEmbed = new MessageEmbed().addField("Utilidade / Moderação", "Comandos para auxiliar na moderação e organização do server.")
                    .addField("\:globe_with_meridians:\:m: embed", find("embed"), true).addField("\:globe_with_meridians:\:m: say", find("say"), true)
                    .addField("*", "*", true)

                i.deferUpdate()
                msg.edit({ content: null, embeds: [configEmbed] })
            }
            else if (values === "music") {
                const configEmbed = new MessageEmbed().addField("Música", "Todos os comandos relacionados a músicas.")
                    .addField("\:globe_with_meridians:\:m: play", find("play"), true).addField("\:globe_with_meridians:\:m: queue", find("queue"), true)
                    .addField("\:globe_with_meridians: pause", find("pause"), true).addField("\:globe_with_meridians: resume", find("resume"), true)
                    .addField("\:globe_with_meridians:\:m: skip", find("skip"), true).addField("\:globe_with_meridians:\:m: songinfo", find("songinfo"), true)
                    .addField("\:globe_with_meridians:\:m: stop", find("stop"), true).addField("*", "*", true).addField("*", "*", true)

                i.deferUpdate()
                msg.edit({ content: null, embeds: [configEmbed] })
            }

        })
    }
}//.addField("", find(""), true)