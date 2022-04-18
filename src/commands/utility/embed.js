const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "embed",
    description: "Faz uma embed com o que você me disser",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return embed.setDescription(`**Você não tem permissão para usar esse comando!,  ${interaction.user.username}**`),
                await message.reply({ embeds: [embed] })
        }
        if (args === undefined) return message.reply(`Você precisa inserir uma mensagem ${message.author}`)
        embed.setTitle(args).setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        await message.channel.send({ embeds: [embed] }).setTimestamp()
    }
}