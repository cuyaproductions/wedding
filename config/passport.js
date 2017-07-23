import LocalStrategy from 'passport-local';

function configPassport (passport) {
  passport.use(new LocalStrategy({
     usernameField: 'username',
     passwordField: 'password',
   },
   (username, password, done) => {
     if (username !== 'diego') {
       return done(null, false, {message: 'Wrong username.'});
     }

     if (password !== 'diego') {
       return done(null, false, {message: 'Wrong password.'});
     }
     return done(null, {username, password});
   }));

  passport.deserializeUser((username, done) => {
    return done(null, username);
  });

  passport.serializeUser((user, done) => {
    if (user.username === 'diego') {
      return done(null, user.username);
    }

    return ('Wrong username', false);
  });
}

export default configPassport;
