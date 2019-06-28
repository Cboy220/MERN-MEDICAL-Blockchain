const express = require('express');
const path  =  require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'views/build')));

app.get('/api',(req, res)=>{
  res.send("hello world");
})

const port = process.env.PORT || 1038;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

console.log(`This program is listening at ${port}`);
