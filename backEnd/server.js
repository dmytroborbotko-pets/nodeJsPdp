const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const authRouter = require("./router/auth.routes");
const userRouter = require("./router/user.routes");
const articleRouter = require("./router/article.routes");
const dotenv = require("dotenv");
const { deleteSessionSchedule } = require("./services/deleteSessionShchedule");
const cron = require("node-cron");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cron.schedule("0 * * * *", deleteSessionSchedule);
