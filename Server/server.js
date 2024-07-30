const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./Utils/Database/connectDb");
const userRouter = require("./Routes/user")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user",userRouter)

// connect Database
connectDB(process.env.MONGODB_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On ${process.env.PORT}`);
});
