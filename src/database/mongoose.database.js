const mongoose = require("mongoose");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@apivue.2tf89.mongodb.net/?retryWrites=true&w=majority&appName=ApiVue`
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("connecting to MongoDB", error);
  }
};

module.exports = connectToDataBase;
