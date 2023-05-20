const productModel = require("./model");
const productJson = require("../products.json");
const mongoose = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://subrath96:8892626410a@basis-node-app.nbvvqsr.mongodb.net/store_api?retrywrites=true&w=majority"
    );
    await productModel.deleteMany();
    await productModel.create(productJson);
    console.log("success");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
