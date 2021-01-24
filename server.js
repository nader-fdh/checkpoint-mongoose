const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

// connect db to server
mongoose.connect(
  "mongodb+srv://user:user@e-shop.qdyvd.mongodb.net/e-shop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    else console.log("db is connected");
  }
);

app.use("/users", require("./routes/personRoutes"));
// create server
app.listen("5000", (err) => {
  if (err) throw err;
  else console.log("server is running");
});
