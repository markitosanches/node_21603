const express = require('express')
const app = express();
const fs = require('fs');

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + '/' + 'user.json', 'utf-8', function (err, data) {
        console.log( data );
        res.end( data );
     });
})

app.get('/form', function (req, res){
    res.sendFile( __dirname + '/form.html');    
})

var user = {
    "user4" : {
        "name" : "Anna",
        "password" : "password4",
        "profession" : "Student",
        "id": 4
     }
}

app.post('/addUser', function (req, res) {
    fs.readFile( __dirname + '/' + 'user.json', 'utf-8', function (err, data) {
        data = JSON.parse( data );
        data['user4'] = user['user4'];
        //console.log(data);
        var newData = JSON.stringify(data);
        fs.writeFile('user.json', newData, err => {
            if(err) throw err;
            console.log('Success'); 
        })
     })
})


app.get('/id=:id', function (req, res){
    fs.readFile( __dirname + '/' + 'user.json', 'utf-8', function (err, data) {
    var users = JSON.parse( data);
    //console.log(req.params.id)
    var user = users['user'+req.params.id]
   // console.log(user);
    res.end( JSON.stringify(user));
    })
})

app.get('/form-delete', function (req, res){
    res.sendFile( __dirname + '/form-delete.html');    
})

app.delete('/deleteUser', function (req, res){
    fs.readFile( __dirname + '/' + 'user.json', 'utf-8', function (err, data) {
        data = JSON.parse( data );
        delete data['user4'];
        //console.log(data);
        var newData = JSON.stringify(data);
        fs.writeFile('user.json', newData, err => {
            if(err) throw err;
            console.log('Success'); 
        })
     })

})


var userUp = {
    "user4" : {
        "name" : "John",
        "password" : "password4",
        "profession" : "Prof",
        "id": 4
     }
}

app.get('/form-update', function (req, res){
    res.sendFile( __dirname + '/form-update.html');    
})

app.put('/updateUser', function (req, res){
    fs.readFile( __dirname + '/' + 'user.json', 'utf-8', function (err, data) {
        data = JSON.parse( data );
        data['user4'] = userUp['user4'];
        //console.log(data);
        var newData = JSON.stringify(data);
        fs.writeFile('user.json', newData, err => {
            if(err) throw err;
            console.log('Success'); 
        })
     })

})

const server = app.listen(8081, function (){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })