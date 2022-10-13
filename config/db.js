const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // const dbconfig = "mongodb://localhost/ecommerce-keyboard";
    const dbconfig =
      "mongodb+srv://toan1996:toan1996@mindx-khoa3.zmxcpyp.mongodb.net/keyboard-shop?retryWrites=true&w=majority";
    const connect = await mongoose.connect(dbconfig);
    console.log(`Success, ${connect.connection.host}`);
  } catch (err) {
    console.log("Error connect to database", err);
  }
};

module.exports = connectDB;
