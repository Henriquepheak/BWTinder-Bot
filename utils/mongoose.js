require('dotenv').config();
const mongoose = require('mongoose')
const connectionURL = process.env.MONGODB_PATH

module.exports = async () => {
    await mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) 
    return mongoose
}