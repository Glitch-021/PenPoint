import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import chalk from "chalk";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.bgYellow(`Server running at port ${port}`));
    });
  })
  .catch((error) => {
    console.log(chalk.bgRed("MongoDB connection failed!!", error));
  });
