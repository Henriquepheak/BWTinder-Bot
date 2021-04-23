const mongoose = require('mongoose')
const connectionURL = process.env.MONGO_URL

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            poolSize: 5,
            connectTimeoutMS: 10000,
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