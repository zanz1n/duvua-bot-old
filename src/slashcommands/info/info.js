const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "info",
            description: "Exibe informações sobre o bot"
        })
    }
    async run(interaction) {
        let embed = new MessageEmbed()
        embed.setTitle("Sobre Mim").setDescription("Feita por <@586600481959182357>\n")
            .addField("Ajude o bot a continuar online!", "Para que o bot continue online, precisamos desenbolsar um custo mensal de ${cost}, ajude o projeto a continuar clicando **[aqui](https://www.youtube.com/).**\n")
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField("Comandos básicos:", `**help** - mostra os comandos do bot e dicas, use /help ou ${this.client.prefix}help\n**ping** - mostra o ping do bot, use /ping ou ${this.client.prefix}ping\n\n`)
            .addField("Tem alguma função legal que gostaria de ver no bot ou alguma sugestão?", "Sugira no nosso [servidor do discord](https://discord.com), a dm <@586600481959182357>, ou para coisas mais técnicas o [nosso github](https://github.com).")
        await interaction.editReply({ content: null, embeds: [embed] })
    }
}
