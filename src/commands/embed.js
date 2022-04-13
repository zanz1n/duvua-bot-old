const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "embed",
    description: "Faz uma embed com o que você me disser",
    async execute(client, message, args) {
        if (args === undefined) return message.reply(`Você precisa inserir uma mensagem ${message.author}`)
        const embed = new MessageEmbed().setTitle(args).setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        await message.channel.send({ embeds: [embed] })
    }
}