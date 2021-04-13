require('dotenv').config();
const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:JeffyWhy1753215@cluster0.u4mow.mongodb.net/tokensDB?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.createConnection(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        console.log('MongoDB Connection Initialized')
    }).catch(err => {
        console.error(err)
    })
    return mongoose
}