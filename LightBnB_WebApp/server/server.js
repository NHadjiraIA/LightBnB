const database = require('./database');
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes');

const path = require('path');

const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /api/endpoints
const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

// /user/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.get("/test", (req, res) => {
  database.getAllProperties({'city':'Sotboske','owner_id':1, 'minimum_rating':400, 'minimum_price_per_night':300,'maximum_price_per_night':900},10)
  .then(result => {
    console.log('the result ',result)
    console.log('something will go here')
    }).catch(err => console.log(err))
  
   
  //console.log('this is the example test for reservation ',exampleReservation)
  res.send("🤗");
});

const port = process.env.PORT || 3000; 
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));