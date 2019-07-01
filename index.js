const express = require('express');
const path  =  require('path');
const app = express();
const bodyParser = require('body-parser');

const user = require('./routes/user.route');

app.use(express.static(path.join(__dirname, 'views/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth',user);

app.get('/api',(req, res)=>{
  res.send("hello world");
})

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/userdata';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = process.env.PORT || 1038;


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

console.log(`This program is listening at ${port}`);
