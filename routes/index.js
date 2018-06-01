var express = require('express');
var amortize = require('amortize');
var axios = require('axios');
var request = require('superagent')
var async = require('async')
var router = express.Router();

var wcf = require('../api/proxy');

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

router.post('/insertPHPJSONTest', function(req,res, next){
  // var url = 'https://rfc360-test.zennerslab.com/Service1.svc/process360Test'
  var url = 'https://rfc360-test.zennerslab.com/Service1.svc/searchIdentification'
  var params = {values: JSON.stringify(req.body)}
  // console.log('saving to wcf...')
  console.log('checking identification...')
  request
    .post(url)
    .send(params)
    .end(function(err, result){
      if(err){
        console.log('error ', err)
        return next(err)
      }else{
        console.log('result ', result.body)
        res.send(result.body.process360TestResult)
      }
    })
})

router.post('/insertPHPJSONTestCopy', function(req,res){
  var params = {values: JSON.stringify(req.body)}
  var rfcLink = 'https://rfc360-test.mybluemix.net/applications/saveApplicationCopy';
  var url = 'https://rfc360-test.zennerslab.com/Service1.svc/process360Test'
  console.log(`links used: front ${rfcLink} and back ${url}`);

  function saveAppCopy(){
    console.log('saving application copy...');
    return axios.post(rfcLink, req.body)
  }

  function saveAppToWCF(){
    console.log('saving application to wcf...');
    return axios.post(url, params)
  }

  axios.all([saveAppCopy(), saveAppToWCF()])
  .then(axios.spread(function(appResult, wcfResult){
    var response = {app: appResult.data, wcf: wcfResult.data}
    console.log('done axios all response ', response);

    res.json(response)
  }))
  .catch(function(appErr, wcfErr){
    var error = { appErr: appErr, wcfErr: wcfErr }
    console.log('axios all error ', error)
    res.json(error)
  })
})

router.post('/insertPHPJSONProd', function(req,res, next){
  var url = 'https://api360.zennerslab.com/Service1.svc/process360Test'
  var params = {values: JSON.stringify(req.body)}
  console.log('saving to wcf...')
  request
    .post(url)
    .send(params)
    .end(function(err, result){
      if(err){
        console.log('error ', err)
        return next(err)
      }else{
        console.log('result ', result.body)
        res.send(result.body.process360TestResult)
      }
    })
})

router.post('/insertPHPJSONProdCopy', function(req,res){
  var params = {values: JSON.stringify(req.body)}
  var rfcLink = 'https://rfc360.mybluemix.net/applications/saveApplicationCopy';
  var url = 'https://api360.zennerslab.com/Service1.svc/process360Test'
  console.log(`links used: front ${rfcLink} and back ${url}`);

  function saveAppCopy(){
    console.log('saving application copy...');
    return axios.post(rfcLink, req.body)
  }

  function saveAppToWCF(){
    console.log('saving application to wcf...');
    return axios.post(url, params)
  }

  axios.all([saveAppCopy(), saveAppToWCF()])
  .then(axios.spread(function(appResult, wcfResult){
    var response = {app: appResult.data, wcf: wcfResult.data}
    console.log('done axios all response ', response);

    res.json(response)
  }))
  .catch(function(appErr, wcfErr){
    var error = { appErr: appErr, wcfErr: wcfErr }
    console.log('axios all error ', error)
    res.json(error)
  })
})

module.exports = router;
