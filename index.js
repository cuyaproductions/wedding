import path from 'path';
import dotenv from 'dotenv';
import hbs from 'hbs';

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import findLanguage from './middleware/international';
import sanitizeBody from './middleware/sanitizeBody';
import configHbs from './config/hbs';
import configPassport from './config/passport';
import router from './routes';

const app = express();

dotenv.config();
configPassport(passport);
configHbs(hbs, app);

mongoose.connect(process.env.DB_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ ⚠️ ⚠️ ⚠️  ↠  ${err.message}\n\n`);
});

app.locals.appName = 'Nic + Diego';

// Templating settings
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/static', express.static(path.resolve(__dirname, 'dist')));
app.use(sanitizeBody);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});