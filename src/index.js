const Discord = require('discord.js')
const { Client, MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: [
        'MESSAGE',
        'REACTION'
    ]
})

client.commands = new Discord.Collection()

const CMDfiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'))

for (const file of CMDfiles) {
    const command = require(`../src/commands/${file}`)

    client.commands.set(command.name, command)
}

const prefix = "k!"

client.on("ready", () => {
    console.log(`Clent logged to discord-api as ${client.user.username} in ${client.guilds.cache.size} guild(s)`)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const [msgcommand, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)

    const cmds = ['ping', 'say']

    function load(number) {
        if (msgcommand === client.commands.get(cmds[number]).name) client.commands.get(cmds[number]).execute(message, args)
    }
    load(0); load(1) // load(2); load(3); load(4);
})

client.login(process.env.TOKEN)