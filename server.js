const express = require('express');
const app = express(),
    bodyParser = require('body-parser'),
    port = process.env.port || 8000,
    mainRoutes = require('./controllers/main'),
    authenticationRoutes = require('./controllers/authentication'),
    blocksRoutes = require('./controllers/blocks'),
    root = require('./util/root'),
    path = require('path'),
    mongoUri = require('./util/database'),
    mongoose = require('mongoose'),
    session = require('express-session');
const redisStore = require('connect-redis')(session);


// set ejs template/view engine
app.set('view engine', 'ejs');

// addition of body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set static files directory
app.use(express.static(path.join(root, 'public')));

// session
app.use(session({
    secret: 'secret',
    resave: false,
    store: new redisStore({ port: 6379, host: '127.0.0.1'}),
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 86400 }
}));


// custom middleware that enables the use of messages in a client-server cycle
app.use((req,res,next)=>{
    res.locals.messages = req.session.messages;
    delete req.session.messages;
    next();
});

// Routes
app.use(authenticationRoutes);
app.use(blocksRoutes);
app.use(mainRoutes);


mongoose.connect(mongoUri, { autoIndex: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`The app listens on port ${port}`);
        });
    })
    .catch(err => console.log(err));
