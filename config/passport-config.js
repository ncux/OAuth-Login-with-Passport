const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');

// get user schema from the database model
const User = require('../models/user');

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/user-info',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {      // passport callback function
    // console.log(profile);
    // 1st check if user already exists in database:
    let user = await User.findOne({google_ID: profile.id});
    if (user) { done(null, user) }
    else {  // create new user
        let new_user = await new User({username: profile.displayName, google_ID: profile.id, thumbnail: profile._json.image.url}).save();
        console.log(`New user created: ${new_user}`);
        done(null, new_user);
    }
 })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser( async (id, done) => {
    let current_user = await User.findById(id);
    done(null, current_user);
});

