const slashCommand = require('../../slashCommands')

module.exports = class extends slashCommand {
    constructor(client) {
        super(client, {
            name: "say",
            description: "Eu falo o que você me pedir",
            options: [
                {
                    name: "content",
                    description: "O que você quer que eu fale",
                    type: 3,
                    required: true
                }
            ]
        })
    }
    async run(interaction) {
        interaction.reply({ content: `${interaction.options.getString('content')}\n-${interaction.user}` })
    }
}