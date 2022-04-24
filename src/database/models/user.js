const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    _id: { type: String },
    userid: { type: String },
    usertag: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
})

module.exports = mongoose.model("user", userSchema)