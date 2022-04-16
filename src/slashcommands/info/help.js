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
        embed.setTitle("Help")
            .setDescription(`**${this.client.user} pode fazer muitas coisas para o seu servidor.**\nO que inclui tocar músicas, ver avatar de usuários, beijar alguém e até fazer um meme, confira todos os comandos do bot abaixo:`)

            .addField("Música", "Todos os comandos relacionados a músicas.")

            .addField("play", "Toca uma música do youtube.", true).addField("queue", "Exibe o som que está tocando na fila.", true)
            .addField("pause", "Pausa a reprodução do bot.", true).addField("resume", "Despausa a reprodução do bot.", true)
            .addField("skip", "Pula a música que está tocando.", true).addField("songinfo", "Mostra o som que está tocando.", true)
            .addField("stop", "Para o bot e limpa a fila de reprodução", true).addField("*", "*", true).addField("*", "*", true)

            .addField("Info / Utilidade", "Comandos de info ou de utilidade.")

            .addField("ping", "Responde com pong e mostra o meu ping.", true).addField("info", "Exibe informações sobre o bot.", true)
            .addField("embed", "Faço uma embed com o que me disser.", true).addField("say", "Eu falo o que você me pedir.", true)
            .addField("help", "Exibe as funções e os comandos do bot.", true).addField("*", "*", true)

            .addField("Fun", "Comandos for fun e de diversão em geral.")

            .addField("kiss", "Beija alguém.", true).addField("avatar", "Exibe o avatar de alguém.", true)
            .addField("*", "*", true)

            .addField("Tem alguma função legal que gostaria de ver no bot ou alguma sugestão?", "Sugira no nosso [servidor do discord](https://discord.com), a dm <@586600481959182357>, ou para coisas mais técnicas o [nosso github](https://github.com).")
            .setThumbnail(this.client.user.displayAvatarURL())

            .setFooter({ text: `Requisitado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setTimestamp()
        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}