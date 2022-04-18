const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = {
    name: "say",
    description: "Diz o que é dito para dizer",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${interaction.user.username}**`),
                await message.reply({ embeds: [embed] })
        }
        if (args === undefined || args.length <= 1) return message.reply(`Você precisa inserir uma mensagem ${message.author}`)
        await message.channel.send(`${args}\n-${message.author}`)
    }
}