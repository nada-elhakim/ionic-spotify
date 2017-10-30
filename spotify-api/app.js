var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser')

var client_id = '1141cb8f9e66467d8cf514b799a3773e'; // Your client id
var client_secret = '6468c9dc1d48472a915d3552d0c27a36'; // Your secret
var redirect_uri = 'http://localhost/callback'; // Your redirect uri

app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
});

app.post('/exchangeToken', function (req, res) {
    console.log(req);

    var code = req.body.code;
    console.log(code);
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        res.send(body);
    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});