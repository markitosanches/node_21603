const express = require('express')
const app = express()
const fs = require('fs')
const twit = require('twit')
const config = require('./config.js')

const Twitter = new twit(config);

var params = {
    q: '#quebec',
    result_type: 'recent',
    lang: 'en'
}

Twitter.get('search/tweets', params, function(err, data){
   // console.log(data);
   //console.log(data.statuses[0].text);
   var newData = JSON.stringify(data);
   fs.writeFile('tweet.json', newData, err => {
    if(err) throw err;
    console.log("Success");
   })
})

app.get('/Twitter', function (req, res){
    fs.readFile( __dirname + "/" + "tweet.json", 'utf8', function (err, data) {
        res.end( data );
     })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })