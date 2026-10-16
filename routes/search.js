var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async function (req, res, next) {
    const search = req.body.search;

    try {
        const result = await prisma.blogContent.findMany({
            where: {
                OR: [ 
                    { title : { contains : search } },
                    { content : { contains : search } },
                ]
            },
        });

        res.render("search", { result, search });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error searching posts");
    }
});

router.get("/", async function (req, res, next) {
});

module.exports = router;