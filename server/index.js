const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ctrl = require('./controller'),
    massive = require('massive'),
    PORT = 3005;
require('dotenv').config();


app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then(db =>{
        console.log('db on')
        app.set('db', db)
    })
    .catch(err => console.log(err))


app.post('/api/auth/register', ctrl.createUser)

app.post('/api/auth/login', ctrl.checkLogin);




app.listen(PORT, () => console.log('Listening'))

