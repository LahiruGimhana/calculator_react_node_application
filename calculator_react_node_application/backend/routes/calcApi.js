let express = require('express');
let router = express.Router();
let Engine= require('../main/engine');
let bodyParser = require('body-parser')

let client=new Engine();

// Get all history records
router.get('/historyList', function (req, res) {
  // console.log(res)
  // res.send(client.getHistory());
  // res.send('Get all history records');
  try {
    
      let allHistory=res.send(client.getHistory());
      res.send(JSON.stringify(allHistory));
  

  } catch (error) {
    console.error(`[CALCAPI.GETHISTORY] - Error Occurred`, error);
    res.status(500).send('Error occurred');
  }
})


// Save a history record
router.post('/history', function (req, res) {
  try {
    if(req.body){
      let history=client.setHistory(req.body);
      res.send(JSON.stringify(history)); //object convert to jsonstring    we can sent only string https req
    }
    else{
      console.warn(`[CALCAPI.SAVEHISTORY] - empty body`);
      res.status(400).send('empty body')
    }

  } catch (error) {
    console.error(`[CALCAPI.SAVEHISTORY] - Error Occurred`, error);
    res.status(500).send('Error occurred');
  }
})

// Delete all history
router.delete('/history', function (req, res) {
  client.deleteHistory();
  res.send('Success Delete history');
})

module.exports = router;