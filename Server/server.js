const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./Utils/Database/connectDb");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect Database
connectDB(process.env.MONGODB_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On ${process.env.PORT}`);
});
