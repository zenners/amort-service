var request = require('superagent')

module.exports = {

  rfcpost: function(path, params, cb){
    var rfcService = 'https://rfc360-test.zennerslab.com/Service1.svc'
    console.log(rfcService + path)
    console.log(params)
    var options = {
      // proxy: 'http://statica3752:3831e0a674b9f169@sl-ams-01-guido.statica.io:9293',
      url: rfcService + path,
      json: params,
      method: 'POST',
    };

    request(options, cb)
  }
}
