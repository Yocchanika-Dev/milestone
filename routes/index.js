var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const milestone = await prisma.BlogContent.findMany();
    res.render("index", { milestone: milestone });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// フォーム表示提出後の処理
router.post("/", async function (req, res, next) {
  // console.log(req.body.title, req.body.date, req.body.content);
  try {
    await prisma.BlogContent.create({
      data: {
        title: req.body.title,
        date: req.body.date,
        content: req.body.content,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

module.exports = router;