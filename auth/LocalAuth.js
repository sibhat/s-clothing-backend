const express = require("express");
const router = express.Router();
const helper = require("./helper");

router.use("/login",  helper.signIn);
router.use("/register",  helper.register);

module.exports =  router;
