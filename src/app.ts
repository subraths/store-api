import express from "express";
import { config } from "dotenv";
import connectDB from "./db";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";
import router from "./routes/router";
import "express-async-errors";

// to access process.env variables
config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI || "";

app.use(express.json());

app.use("/api/v1/products", router);

app.use(notFound);

app.use(errorHandler);

const connect = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

connect();
