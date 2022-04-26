const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bruno",
    description: "Não falamos do bruno",
    async execute(client, message, args) {
        await message.reply({
            content: null,
            embeds: [new MessageEmbed()
                .setDescription(`**Não falamos do Bruno${message.author}\nMas clique [aqui](https://youtu.be/dWcrZv5p7Jg) para ver essa obra de arte**`)
                .setThumbnail("https://i.ytimg.com/vi/dWcrZv5p7Jg/maxresdefault.jpg")
            ]
        })
    }
}
