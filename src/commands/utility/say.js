const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = {
    name: "say",
    description: "Diz o que é dito para dizer",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${message.author.username}**`)
            return await message.reply({ embeds: [embed] })
        }
        if (args === undefined || args.length <= 1) {
            embed.setDescription(`**Você precisa inserir uma mensagem, ${message.author.username}**`)
            return await message.reply({ embeds: [embed] })
        }
        await message.channel.send(`${args}\n-${message.author}`)
    }
}