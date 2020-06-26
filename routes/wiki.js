const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const views = require("../views");

router.get("/", async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(views.main(pages));
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await page.save();
    await user.save();
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
    res.send(
      await views.wikiPage(
        Page.findOne({ where: { slug: req.params.slug } }),
        {}
      )
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
