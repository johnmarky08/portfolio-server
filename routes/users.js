const express = require("express");
const { Update, Read } = require("../controllers/Users.js");

const router = express.Router();

router.get("/:type", Update);
router.get("/read", Read);

module.exports = router;
