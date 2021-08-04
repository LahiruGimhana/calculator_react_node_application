var express = require('express');
var app = express();
const calcApi = require('./routes/calcApi');
let bodyParser = require('body-parser');
var cors = require('cors')

 
app.use(cors())

// app.use('/api/', require('/'))
app.use(bodyParser.json())


// ...

//calApi ekata yanawa    url===> localhost3000/calApi/history
app.use('/calcApi', calcApi)


const port = 3300

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`)
})