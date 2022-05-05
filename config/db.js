// Connection file for mongodb using mongoose

const { mongoose } = require("mongoose");
// if ".env" resides outside the parent folder then we have to provide path of the "".env" file
// require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongogDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = { connectDB };
