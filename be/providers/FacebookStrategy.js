const FacebookStrategy = require('passport-facebook');
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || "";
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || "";
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || "";
const verifyCallback = require("../services/user.Service").loginWithFacebook;

module.exports = new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: FACEBOOK_REDIRECT_URI,
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, verifyCallback);
