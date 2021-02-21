const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();

require("dotenv").config();

const path = require("path");
let userRoute = require("./routes/user.route");

const server = http.createServer(app);

mongoose.connect(
  process.env.DBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error, result) => {
    if (error) {
      console.log("error while connecting to db", error);
    } else {
      console.log("successfully connected with db");
    }
  }
);

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("welcome");
});

const PORT = process.env.PORT || 8000
if (process.env.NODE_ENV === "development") {
  server.listen(PORT, () => console.log("http server running on port 8000"));
} else {
  server.listen(PORT, () =>
    console.log("HTTPS Server running on port 8000")
  );
}

