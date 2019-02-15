const  passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require("express");
const router = express.Router();
const db = require("../data/queries");
const helper = require("./helper");

passport.use(new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("accessToken ",accessToken);
        // console.log("refreshToken ",refreshToken);
        // console.log("profile ",profile);
        db.findOrCreateUser(profile, function (err, user) {
            if(err) {cb(null, false)}
            else{cb(null, user) }
        });

    }
));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.get("/", passport.authenticate('google', {
    scope: ["profile", "email", "openid"]
}));
router.get("/callback", passport.authenticate('google', { failureRedirect: `${process.env.GOOGLE_REDIRECT_URI_FAILURE}` }),
    (req, res, next) =>{
        req["token"] = helper.tokenGenerator(req.session.passport.user);
        next();
    },
    (req, res) =>{
        // Successful authentication, redirect home.
        res.redirect(`${process.env.GOOGLE_REDIRECT_URI}?token=${req.token}`);
    }
);

module.exports =  router;
