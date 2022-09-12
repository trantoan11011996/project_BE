const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const dbConfig = 'mongodb://localhost/ecommerce-keyboard';
        const connect = await mongoose.connect(dbConfig)
        console.log(`succes, ${connect.connection.host}`);
    }catch(err){
        console.log('Error connect to database')
    }
}

module.exports = connectDB