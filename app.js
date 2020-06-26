const express = require("express");
const morgan = require("morgan");
const models = require("./models");
const wikiRoutes = require("./routes/wiki.js");
const userRoutes = require("./routes/user.js");
const { main } = require("./views");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));
app.use(express.static(__dirname + "./public"));

app.use("/", wikiRoutes);
app.use("/wiki", wikiRoutes);
app.use("/user", userRoutes);

const init = async () => {
  await models.db.sync();

  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
};

init();
