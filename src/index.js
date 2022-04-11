console.log(`\x1b[34m[bot-api] Starting ...`)
const Discord = require('discord.js')
const { Client, MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
const { join } = require('path')
require('dotenv').config()

class ClienT extends Client {
    constructor(options) {
        super(options)
        this.commands = new Discord.Collection()
        this.slashCommands = []
        this.loadSlashCommands()
        this.loadEvents()
    }
    loadSlashCommands(path = 'src/slashcommands') {
        const categories = fs.readdirSync(path)
        for (const category of categories) {
            const slashCommands = fs.readdirSync(`${path}/${category}`)

            for (const slashCommand of slashCommands) {
                const slashCommandClass = require(join(process.cwd(), `${path}/${category}/${slashCommand}`))
                const scmd = new (slashCommandClass)(this)

                this.slashCommands.push(scmd)
                console.log(`\x1b[35m[bot-commands] slashCommand ${scmd.name} loaded\x1b[0m`)
            }
        }
    }
    loadEvents(path = 'src/events') {
        const categories = fs.readdirSync(path)
        for (const category of categories) {
            const events = fs.readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
                console.log(`\x1b[36m[bot-events] Event ${evt.name} loaded\x1b[0m`)
            }
        }
    }
    registrySlashCommands() {
        this.guilds.cache.get('951236777560129627').commands.set(this.slashCommands) //for Dev
        // this.application.commands.set(this.commands) //for Production environment
    }
}

const client = new ClienT({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'REACTION']
})

const CMDfiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'))

for (const file of CMDfiles) {
    const command = require(`../src/commands/${file}`)

    client.commands.set(command.name, command)
}

const prefix = "k!"

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const [msgcommand, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)
    let cmds = []

    function load(number, name) {
        cmds.push(name)
        if (msgcommand === client.commands.get(cmds[number]).name) client.commands.get(cmds[number]).execute(message, args)
    }
    load(0, 'ping'); load(1, 'say');
})

module.exports = ClienT

client.login(process.env.TOKEN)