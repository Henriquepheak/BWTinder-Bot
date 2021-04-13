const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    userID: String,
    apiToken: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('tokens', tokenSchema)