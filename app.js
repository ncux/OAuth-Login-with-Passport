const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const passport = require('passport');
const cookieSession = require('cookie-session');

const port = process.env.PORT || 3000;

const app  = express();

// bootstrap database connection
const { database } = require('./database');

// routers
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// passport config
const passportConfig = require('./config/passport-config');

//  session cookie keys
const session_key = require('./config/keys');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieSession({maxAge: 24*60*60*1000, keys: [session_key.sessionCookieKey]}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// for auth base url
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => res.render('home', {user: req.user}));

app.listen(port, () => console.log(`Server running on port ${port}`));
