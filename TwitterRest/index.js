const express = require('express')
const app = express()
const fs = require('fs')
const twit = require('twit')




var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })