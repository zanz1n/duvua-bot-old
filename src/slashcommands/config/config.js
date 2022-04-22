const slashCommand = require('../../structures/slashCommands')
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "config",
            description: "Configura o canal das mensagens de bem vindo",
            requireDatabase: true,
            options: [{
                type: 'SUB_COMMAND',
                name: 'wellcome',
                description: "Canal das mensagens de boas vindas",
                options: [
                    {
                        name: "canal",
                        description: "O canal que você deseja usar as mensagens",
                        type: 7,
                        required: true
                    },
                    {
                        name: "mensagem",
                        description: "A mensagem de boas vindas que você deseja exibir",
                        type: 3,
                        required: true
                    }
                ]
            }]
        })
    }
    async run(interaction) {
        let embed = new MessageEmbed()
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            embed.setDescription(`**Você não tem permissão para usar esse comando, ${interaction.user.username}**`)
            return await interaction.editReply({ content: null, embeds: [embed] })
        }

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
        /*const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()*/
    }
}
