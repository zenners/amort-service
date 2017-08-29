var express = require('express');
var amortize = require('amortize');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('post to my url with amount rate and total term, schedule will be given')
});

router.post('/term', function(req,res,next){
  const { amount, rate, totalTerm, amortizeTerm } = req.body
  var amortObj = amortize({ amount, rate, totalTerm, amortizeTerm })

  res.send(amortObj)
})

router.post('/schedule', function(req,res,next){
  const { amount, rate, totalTerm } = req.body
  var amortObj = { amount, rate, totalTerm }
  var obj = {}

  for (var i = 1; i <= totalTerm; i++){
    amortObj.amortizeTerm = i // better to use object extend
    obj[i] = amortize(amortObj)
  }
  res.send(obj)
})

module.exports = router;
