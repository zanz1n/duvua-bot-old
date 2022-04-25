const { Client } = require('discord.js')
const fs = require('fs')
const { join } = require('path')
const { Player } = require('discord-player')
const config = require('../config.json')
const mongoose = require('mongoose')
const Models = require('../database/Models')

module.exports = class Bot extends Client {
    constructor(options) {
        super(options)
        this.prefix = config.prefix
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
                console.log(`\x1b[35m[bot-slashCommands] ${scmd.name} loaded\x1b[0m`)
            }
        }
        console.log(`\x1b[33m[bot-api] all slashCommands loaded\x1b[0m`)
    }
    loadCommands(path = 'src/commands') {
        const categories = fs.readdirSync(path)
        for (const category of categories) {
            const commands = fs.readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const cmd = require(join(process.cwd(), `${path}/${category}/${command}`))

                this.commands.push(cmd)
                console.log(`\x1b[34m[bot-legacyCommands] ${cmd.name} loaded\x1b[0m`)
            }
        }
        console.log(`\x1b[33m[bot-api] All legacyCommand loaded\x1b[0m`)
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
    async connectToDatabase() {
        const connection = await mongoose.connect(config.mongodb_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        })

        this.db = { connection, ...Models }
        console.log("\x1b[32m[mongoose-db] connected to the database \x1b[0m")
    }
    registrySlashCommands() {
        this.guilds.cache.get(config.tests_guild_id).commands.set(this.slashCommands) //for Dev
        // this.application.commands.set(this.slashCommands) //for Production environment
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
