const { MessageEmbed } = require('discord.js')
const Canvacord = require('canvacord')

module.exports = {
    name: "level",
    description: "Mostra o seu level de interação no servidor",
    async execute(client, message, args) {
        const embed = new MessageEmbed()

        const user = await message.mentions.users.first() || message.author
        const member = await message.mentions.members.first() || message.member
        if (user.bot) {
            embed.setDescription(`**${user} é um bot, ${message.author.username}**`)
            return message.reply({ content: null, embeds: [embed] })
        }

        const mensioned = await client.db.member.findById(message.guild.id + user.id) ||
            new client.db.member({ _id: message.guild.id + user.id, guildid: message.guild.id, userid: user.id, usertag: user.tag });

        mensioned.save()

        const meta = 3 * (mensioned.level ** 2)

        const rank = new Canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setLevel(mensioned.level)
            .setCurrentXP(mensioned.xp)
            .setBackground("COLOR", "#464e4e")
            .setRank(0)
            .setRequiredXP(meta)
            .setStatus("dnd")
            .setProgressBar(member.displayHexColor, "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
        rank.build().then(data => {
            message.reply({ content: null, files: [data] })
        })
    }
}
