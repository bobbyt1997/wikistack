const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    allowNull: false,
  },
});

Page.beforeValidate((pageInstance) => {
  console.log("****In Page.beforeValidate****");
  pageInstance.slug = pageInstance.title
    .replace(/\s+/g, "_")
    .replace(/\W/g, "");
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
});

Page.belongsTo(User, { as: "author" });

module.exports = {
  db,
  Page,
  User,
};
