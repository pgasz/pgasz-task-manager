const mongoose = require('mongoose');

const connectionString = ``;

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
