console.log(`\x1b[34m[bot-api] Starting ...`)
const Discord = require('discord.js')
const { Client, MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
const { join } = require('path')
require('dotenv').config()
const { Player } = require('discord-player')
const { Permissions } = require('discord.js')

const prefix = "-"
class ClienT extends Client {
    constructor(options) {
        super(options)
        this.prefix = prefix
        this.commands = new Discord.Collection()
        this.slashCommands = []
        this.loadSlashCommands()
        this.loadEvents()
        this.loadPlayer()
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
        console.log(`\x1b[34m[bot-api] All slashCommands loaded\x1b[0m`)
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
    loadPlayer() {
        this.player = new Player(this, {
            ytdlOptions: {
                quality: "highestaudio",
                highWaterMark: 1 << 25
            }
        })
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
const CMDfiles2 = fs.readdirSync('src/commands/music').filter(file => file.endsWith('.js'))

for (const file of CMDfiles) {

    const command = require(`../src/commands/${file}`)
    client.commands.set(command.name, command)

    console.log(`\x1b[35m[bot-commands] command ${command.name} loaded\x1b[0m`)
}
for (const file of CMDfiles2) {

    const command = require(`../src/commands/music/${file}`)
    client.commands.set(command.name, command)

    console.log(`\x1b[35m[bot-commands] command ${command.name} loaded\x1b[0m`)
}

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const [msgcommand, agors] = message.content.trim().substring(prefix.length).split(/\s+/)
    const args = message.content.replace(prefix + msgcommand, "")
    let cmds = []

    function load(number, name) {
        cmds.push(name)
        if (msgcommand.toLowerCase() === client.commands.get(cmds[number]).name) client.commands.get(cmds[number]).execute(client, message, args) //commands is now .toLowerCase()
    }
    load(0, 'ping'); load(1, 'say'); load(2, 'embed'); load(3, 'play'); load(4, 'skip'); load(5, 'stop'); load(6, 'queue');
    load(7, 'song'); load(8, 'memory'); load(9, 'avatar');
})

module.exports = ClienT

client.login(process.env.TOKEN)