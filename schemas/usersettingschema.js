const mongoose = require('mongoose');

const userSettingsSchema = mongoose.Schema({
    userID: String,
    autoDMOn: Boolean,
    setKeyInDMS: Boolean,
}, {
    timestamps: true
})

module.exports = mongoose.model('settings', userSettingsSchema)