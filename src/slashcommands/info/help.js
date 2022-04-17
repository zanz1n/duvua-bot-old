const slashCommand = require('../../slashCommands')
const { MessageEmbed } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Exibe as funções e os comandos do bot"
        })
    }
    async run(interaction) {
        let embed = new MessageEmbed()
        const find = (command) => {
            return this.client.slashCommands.find(c => c.name === command).description
        }
        embed.setTitle("Help")
            .setDescription(`**${this.client.user} pode fazer muitas coisas para o seu servidor.**\nO que inclui tocar músicas, ver avatar de usuários, beijar alguém e até fazer um meme, confira todos os comandos do bot abaixo:\n\n**\:globe_with_meridians: - slash commands | \:m: - legacy commands**\n\n\:globe_with_meridians: - digite:  **/**  para ver as opções; \:m: - podem ser usados com o prefixo:  **${this.client.prefix}**  no chat`)

            .addField("Música", "Todos os comandos relacionados a músicas.")

            .addField("\:globe_with_meridians:\:m: play", find("play"), true).addField("\:globe_with_meridians:\:m: queue", find("queue"), true) //proposital error
            .addField("\:globe_with_meridians: pause", find("pause"), true).addField("\:globe_with_meridians: resume", find("resume"), true)
            .addField("\:globe_with_meridians:\:m: skip", find("skip"), true).addField("\:globe_with_meridians:\:m: songinfo", find("songinfo"), true)
            .addField("\:globe_with_meridians:\:m: stop", find("stop"), true).addField("*", "*", true).addField("*", "*", true)

            .addField("Info / Utilidade", "Comandos de info ou de utilidade.")

            .addField("\:globe_with_meridians:\:m: ping", find("ping"), true).addField("\:globe_with_meridians: info", find("info"), true)
            .addField("\:globe_with_meridians:\:m: embed", find("embed"), true).addField("\:globe_with_meridians:\:m: say", find("say"), true)
            .addField("\:globe_with_meridians: help", find("help"), true).addField("*", "*", true)

            .addField("Fun", "Comandos for fun e de diversão em geral.")

            .addField("\:globe_with_meridians: kiss", find("kiss"), true).addField("\:globe_with_meridians:\:m: avatar", find("avatar"), true)
            .addField("*", "*", true)

            .addField("Tem alguma função legal que gostaria de ver no bot ou alguma sugestão?", "Sugira no nosso [servidor do discord](https://discord.com), a dm <@586600481959182357>, ou para coisas mais técnicas o [nosso github](https://github.com).")
            .setThumbnail(this.client.user.displayAvatarURL())

            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true })
    }
}