console.log(`\x1b[33m[bot-api] Starting [...]\x1b[0m`)

const { Intents } = require('discord.js')
const Bot = require('./structures/Client')
//const mongoose = require('./database/')

const config = require('./config.json')

const client = new Bot({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'REACTION']
})

client.login(config.token)