const mongoose = require('mongoose')
const Schema = mongoose.Schema

let memberSchema = new Schema({
    _id: { type: String },
    guildid: { type: String },
    userid: { type: String },
    usertag: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
})

module.exports = mongoose.model("member", memberSchema)