const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "level",
    description: "Mostra o seu level de interação no servidor",
    async execute(client, message, args) {
        const meta = 3 * (message.member.db.level ** 2)
        const embed = new MessageEmbed().setDescription(`**Seu level atual no servidor ${message.guild.name} é ${message.member.db.level}**
        Seu progresso para atingir o level ${message.member.db.level + 1} é ${message.member.db.xp}/${meta} pontos!`
        )

        message.reply({ content: null, embeds: [embed] })
    }
}
