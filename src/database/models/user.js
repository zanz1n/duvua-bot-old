const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    _id: { type: String },
    usertag: { type: String },
    last_daily_request: { type: Number, default: new Date },
    job: { type: String, default: "mendigo" },
    gold_coins: { type: Number, default: 0 }
})

module.exports = mongoose.model("user", userSchema)
