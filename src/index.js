console.log(`\x1b[34m[bot-api] Starting ...\x1b[0m`)

const Discord = require('discord.js')
const { Client, MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
const { join } = require('path')
const { Player } = require('discord-player')
const { Permissions } = require('discord.js')

require('dotenv').config()

const prefix = "-"
class ClienT extends Client {
    constructor(options) {
        super(options)
        this.prefix = prefix
        this.commands = []
        this.slashCommands = []
        this.loadCommands()
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
    loadCommands(path = 'src/commands') {
        const categories = fs.readdirSync(path)
        for (const category of categories) {
            const commands = fs.readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const cmd = require(join(process.cwd(), `${path}/${category}/${command}`))

                this.commands.push(cmd)
                console.log(`\x1b[35m[bot-commands] legacyCommand ${cmd.name} loaded\x1b[0m`)
            }
        }
        console.log(`\x1b[34m[bot-api] All legacyCommand loaded\x1b[0m`)
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
        this.guilds.cache.get(process.env.GUILD_ID).commands.set(this.slashCommands) //for Dev
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

module.exports = ClienT

client.login(process.env.TOKEN)