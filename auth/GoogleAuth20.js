const  passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require("express");
const router = express.Router();
router.use(passport.initialize());
// app.use(passport.session());
passport.use(new GoogleStrategy({
        clientID: "780501094422-8hnmk024jcd77avu55bomsoerqgqr7i2.apps.googleusercontent.com",
        clientSecret: 'dDI9jSKJdtgenpRAAt4dRNWD',
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log("accessToken ",accessToken);
        console.log("refreshToken ",refreshToken);
        console.log("profile ",profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));
router.get("/google", passport.authenticate('google', {
    scope: ["profile", "email"]
}));
router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports =  router;
