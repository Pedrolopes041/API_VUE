const mongoose = require("mongoose");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${import.meta.env.VUE_APP_USER}:${import.meta.env.VUE_APP_PASSWORD}@apivue.2tf89.mongodb.net/?retryWrites=true&w=majority&appName=ApiVue`
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("connecting to MongoDB", error);
  }
};

module.exports = connectToDataBase;
