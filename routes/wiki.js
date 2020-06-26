const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const views = require("../views");

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(views.main(pages));
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOrCreate({
      where: { name: req.body.authorName, email: req.body.email },
    });

    const page = Page.create(req.body);

    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(views.addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const author = await User.findOne({ where: { id: page.authorId } });
    console.log(page);
    res.send(views.wikiPage(page, author));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
