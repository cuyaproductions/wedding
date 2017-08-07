import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';

dotenv.config();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

// Verify initial login from user.
passport.use(new LocalStrategy((username, password, done) => {
  if ((username === ADMIN_USERNAME) && (password === ADMIN_PASSWORD)) {
    return done(null, { username });
  }

  return done('Wrong credentials');
}));

// Serialize user for sessions
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Deserialize user to check if the session they have matches
passport.deserializeUser((username, done) => {
  if (username === ADMIN_USERNAME) {
    return done(null, { username });
  }

  return done('Could not find user');
});

export default passport;
