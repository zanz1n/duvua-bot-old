const Event = require('../../structures/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd"
        })
    }
    run = async (member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id)
        if (!guildDB?.wellcome) return

        const channel = member.guild.channels.cache.get(guildDB.wellcome.channel)

        if (!channel) return
        const embed = new MessageEmbed().setTitle(`Wellcome ${member.user.username}`).setThumbnail(member.displayAvatarURL()).setDescription(guildDB.wellcome.message)
        channel.send({ embeds: [embed] })
    }
}