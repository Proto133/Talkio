const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
const hour = 3600000
    // Set up sessions
const sess = {
    secret: process.env.SECRET,
    cookie: {
        expires: new Date(Date.now() + hour),
        maxAge: hour,
        /* KEPT CAUSING SITE TO CRASH*/
        // sameSite: 'Lax'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


/* Tried to redirect any fictional URL endpoints back to main page.
// app.use(redirectUnmatched);

DIDN'T WORK \u{1F622}

// function redirectUnmatched(req, res) {
//     console.log(req.url)
//         // res.redirect('/');
// }
*/

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Talkio is now connected. Listening on port: ' + PORT));
});