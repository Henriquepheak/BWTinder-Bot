const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
    userID: String,
    autoDMOn: String,
    setKeyInDMS: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('settings', userSettingsSchema)