module.exports = [
    {
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
    },
    {
        type: 'SUB_COMMAND',
        name: 'prefix',
        description: "Altera o prefixo do bot para o servidor",
        options: [{
            name: "prefixo",
            description: "O prefixo que deseja que o bot use",
            type: 3,
            required: true
        }]
    }
]