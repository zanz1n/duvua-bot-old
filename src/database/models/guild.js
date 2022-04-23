const mongoose = require('mongoose')
const Schema = mongoose.Schema

let guildSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    prefix: { type: String },
    wellcome: {
        channel: { type: String },
        message: { type: String },
    }
})

module.exports = mongoose.model("guilds", guildSchema)