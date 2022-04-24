const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "level",
    description: "Mostra o seu level de interação no servidor",
    async execute(client, message, args) {
        const embed = new MessageEmbed().setDescription(`**Seu level atual no servidor ${message.guild.name} é ${message.author.db.level}**
        Seu progresso para atingir o level ${message.author.db.level + 1} é ${message.author.db.xp}/${10 * message.author.db.level} pontos!`
        )

        message.reply({ content: null, embeds: [embed] })
    }
}