const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "level",
    description: "Mostra o seu level de interação no servidor",
    async execute(client, message, args) {
        const embed = new MessageEmbed()

        const user = await message.mentions.users.first() || message.author
        if (user.bot) {
            embed.setDescription(`**${user} é um bot, ${message.author.username}**`)
            return message.reply({ content: null, embeds: [embed] })
        }

        const mensioned = await client.db.member.findById(message.guild.id + user.id) ||
            new client.db.member({ _id: message.guild.id + user.id, guildid: message.guild.id, userid: user.id, usertag: user.tag });

        mensioned.save()

        const meta = 3 * (mensioned.level ** 2)
        if (user.id === message.author.id) {
            embed.setDescription(`**Seu level atual no servidor ${message.guild.name} é ${mensioned.level}**
            Para que você atinja o level ${mensioned.level + 1} serão necessários mais ${meta - mensioned.xp} pontos! (${mensioned.xp}/${meta})`
            )
        } else {
            embed.setDescription(`**O level atual de ${user.username} em ${message.guild.name} é ${mensioned.level}**
            Para que ${user.username} atinja o level ${mensioned.level + 1} serão necessários mais ${meta - mensioned.xp} pontos! (${mensioned.xp}/${meta})`
            )
        }

        message.reply({ content: null, embeds: [embed] })
    }
}
