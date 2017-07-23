import path from 'path';
import dotenv from 'dotenv';
import hbs from 'hbs';

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

import configPassport from './config/passport';
import routes from './routes';

const app = express();

dotenv.config();
configPassport(passport);

app.locals.appName = 'Nic + Diego';

// Templating settings
hbs.registerPartials(path.resolve(__dirname, 'views/partials'));
hbs.localsAsTemplateData(app);
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
app.use(routes(passport));

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});