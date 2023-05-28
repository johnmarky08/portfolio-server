const express = require("express");
const { Update, Read } = require("../controllers/Users.js");

const router = express.Router();

router.get("/read", Read);
router.get("/:type", Update);

module.exports = router;
