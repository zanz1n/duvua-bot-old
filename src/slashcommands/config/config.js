const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "config",
            description: "Configura o canal das mensagens de bem vindo",
            requireDatabase: true,
            options: require('../../utils/config')
        })
    }
    async run(interaction) {
        let embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando, ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }
        const subCommand = interaction.options.getSubcommand()
        if (subCommand === "wellcome") {
            const channel = interaction.options.getChannel("canal")

            if (channel.type !== "GUILD_TEXT") {
                embed.setDescription(`**Você precisa selecionar um canal de texto válido, ${interaction.user.username}**`)
                return await interaction.editReply({ content: null, embeds: [embed] })
            }

            const message = interaction.options.getString("mensagem")

            if (interaction.guild.db.wellcome) interaction.guild.db.wellcome.channel = channel.id
            else interaction.guild.db.wellcome = { channel: channel.id }
            interaction.guild.db.wellcome.message = message

            interaction.guild.db.save()

            embed.setDescription(`**Configurações salvas com sucesso, ${interaction.user.username}**`)
            await interaction.editReply({ content: null, embeds: [embed] })
        }
        else if (subCommand === "prefix") {
            const prefix = interaction.options.getString("prefixo")

            interaction.guild.db.prefix = prefix

            embed.setDescription(`**Configurações salvas com sucesso, ${interaction.user.username}**\n**Agora o novo prefixo é ${interaction.guild.db.prefix}**`)
            await interaction.editReply({ content: null, embeds: [embed] })

            interaction.guild.db.save()
        }
        /*const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()*/
    }
}
