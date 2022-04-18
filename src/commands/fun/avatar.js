const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "avatar",
    description: "Exibe o avatar de um usuário",
    async execute(client, message, args) {
        const [...messageargs] = args.slice(client.prefix.length).split(/ +/)
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const member = message.mentions.members.first() || message.member

        const embed = new MessageEmbed().setColor(member.displayHexColor)
        const image = user.displayAvatarURL({ dynamic: true, size: 2048 })

        embed.setAuthor("Avatar de " + user.username, user.displayAvatarURL()).setImage(image)
            .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp().setDescription(`**Clique [aqui](${user.displayAvatarURL({ format: 'png' })}) para ver original!**`).setTimestamp()
        await message.channel.send({ embeds: [embed] })
    }
}