const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ctrl = require('./controller'),
    massive = require('massive'),
    session = require('express-session'),
    PORT = 3005;
require('dotenv').config();


app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(process.env.CONNECTION_STRING)
    .then(db =>{
        console.log('db on')
        app.set('db', db)
    })
    .catch(err => console.log(err))


app.post('/api/auth/register', ctrl.createUser);

app.post('/api/auth/login', ctrl.checkLogin);

app.post('/api/post/', ctrl.createPost);

app.post('/api/auth/logout', ctrl.logout)

app.get('/api/posts', ctrl.getAllPosts);

app.get('/api/post/:postid', ctrl.getPost);

app.get('/api/auth/me', ctrl.authUser)




app.listen(PORT, () => console.log('Listening'))

