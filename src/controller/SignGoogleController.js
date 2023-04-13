const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const GOOGLE_CLIENT_ID = "1048343711706-gullcd3alqf4l5djfr273ia5qjrh91tv.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(err)
        return cb(err, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});