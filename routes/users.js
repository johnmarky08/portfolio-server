const express = require("express");
const UserRoute = require("../controllers/Users.js");

const router = express.Router();

router.get("/:type", UserRoute);
