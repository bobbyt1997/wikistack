const express = require("express");
const morgan = require("morgan");
const { main } = require("./views");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(main(""));
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
