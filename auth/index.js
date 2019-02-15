const local = require("./LocalAuth");
const google = require("./GoogleAuth20");
const express = require("express");
const router = express.Router();
const  passport = require("passport");
router.use(passport.initialize());

router.use("/google", google);
router.use("/local", local);
module.exports=router;