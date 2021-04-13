const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:JeffyWhy1753215@cluster0.bzgs3.mongodb.net/Tokens?retryWrites=true&w=majority?authSource=admin'

module.exports = {
    init: () => {
        const dbOptions = {
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
        };

        mongoose.connect(connectionURL, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            console.log('Mongoose has been connected successfully!');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    }
}