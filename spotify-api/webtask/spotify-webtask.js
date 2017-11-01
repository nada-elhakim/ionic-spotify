var request = require('request');

var client_id = '1141cb8f9e66467d8cf514b799a3773e'; // Your client id
var client_secret = '6468c9dc1d48472a915d3552d0c27a36'; // Your secret
var redirect_uri = 'http://localhost/callback'; // Your redirect uri


module.exports = function (ctx, req, res) {
  console.log(ctx.body);
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: ctx.data.code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    var json = JSON.stringify(body);
    res.end(json);
  });
};
