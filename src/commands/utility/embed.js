const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = {
    name: "embed",
    description: "Faz uma embed com o que você me disser",
    async execute(client, message, args) {
        let embed = new MessageEmbed()
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando,  ${message.author.username}**`)
            return await message.reply({ embeds: [embed] })
        }
        if (args === undefined || args === "" || args === " ") {
            embed.setDescription(`**Você precisa inserir algo na embed, ${message.author.username}**`)
            return await message.reply({ embeds: [embed] })
        }
        String.prototype.allReplace = function (obj) {
            var retStr = this
            for (var x in obj) {
                retStr = retStr.replace(new RegExp(x, 'g'), obj[x])
            }
            return retStr
        }

        embed.setDescription(args.allReplace({ '/n': '\n' })).setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL() }).setTimestamp()
        await message.channel.send({ embeds: [embed] })
    }
}
