let posts = require("./data");
const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");
const dotenv = require("dotenv");
const morgan = require("morgan");
const notFoundHandler = require("./middleware/notFoundHandler");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use((req, res, next) => {
  console.log("IM A MIDDLEWARE");
  next();
});

app.use((req, res, next) => {
  console.log("IM A MIDDLEWARE 2");
  next();
});

connectDb();
console.log(path.join(__dirname, "media"));

app.use("/api/posts", postsRoutes);

app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
