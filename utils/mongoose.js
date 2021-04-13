const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:JeffyWhy1753215@cluster0.u4mow.mongodb.net/tokensDB?retryWrites=true&w=majority'

module.exports = {
    init: () => {
        const dbOptions = {
            useNewURLParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(connectionURL, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            console.log('Mongoose has connected successfully');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose Error: \n${err.stack}`);
        })

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    }
}