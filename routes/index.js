var express = require('express');
var amortize = require('amortize');
var axios = require('axios');
var request = require('superagent')
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

router.post('/insertPHPJSONTest', function(req,res){
  var params = {values: JSON.stringify(req.body)}
  console.log('params ', params)
  var rfcLink = 'http://rfc360-test.mybluemix.net/applications/saveApplicationCopy';
  var url = 'https://rfc360-test.azurewebsites.net/Service1.svc/process360Test'
  console.log('links ', rfcLink, url)

  request
    .post(rfcLink)
    .send(req.body)
    .end(function(err, result){
      if(err){
        console.log('save copy error ', err);
        res.send(err)
      }else{
        console.log('save copy result ', result.body);
        res.send(result.body)
      }
    })

  request
    .post(url)
    .send(params)
    .end(function(err, result){
      if(err){
        console.log('save wcf error ', err);
        res.send(err)
      }else{
        console.log('save wcf result ', result);
        res.send(result)
      }
    })
})

router.post('/insertPHPJSONProd', function(req,res){
  var params = {values: JSON.stringify(req.body)}
  console.log('params ', params)
  var rfcLink = 'https://rfc360.mybluemix.net/applications/saveApplicationCopy';
  var url = 'https://api360.fundko.com/Service1.svc/process360Test'

  request
    .post(rfcLink)
    .send(req.body)
    .end(function(err, result){
      if(err){
        console.log('save copy error ', err);
        res.send(err)
      }else{
        console.log('save copy result ', result.body);
        res.send(result.body)
      }
    })

  request
    .post(url)
    .send(params)
    .end(function(err, result){
      if(err){
        console.log('save wcf error ', err);
        res.send(err)
      }else{
        console.log('save wcf result ', result);
        res.send(result)
      }
    })
})

module.exports = router;
