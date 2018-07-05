const express = require ('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'Users';
let db;
MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("Database connection successful!");
    db  = client.db(dbName);
  });

app.listen('3000',()=>{
    console.log("listening at 3000")
});

app.get('/', (req,res)=>{
    res.send("Hello, go to /users to see all users")
});


app.post('/index', (req,res)=>{
    pushNewData(function(err,result){
        if (err) throw err;
        res.send(result)
    });
});

function pushNewData(callback){
    const userInfo = db.collection('users');
    userInfo.insertMany([
    {
        'username':'Krystal Anise',
        'password':'missnothing',
        'email':'krystal.anise@gmail.com'
    },{
        'username':'Luanne Charla',
        'password':'watermaloon365',
        'email':'luanne.charla@gmail.com'
    },{
        'username':'Natalee Rikki',
        'password':'cul8rm8',
        'email':'natalee.rikki@hotmail.com'
    },{
        'username':'Floretta Roxana',
        'password':'roxyfloxy225',
        'email':'flo_roxxxana@yahoo.com'
    }
], callback)
}

app.get('/users', (req, res) => {

    getUsers({}, function(err, result) {
        if (err) throw err;
        var usernames = ""
        result.forEach((user) => {
            usernames += user.username + ', ' + 'User ID:    ' + user._id + '</br>';
        });res.send('Search users by their userID </br> </br>' + 'Users are: </br> </br> ' + usernames)
    })

})
app.get('/users/:id',(req,res)=>{
    getUsers({'_id': new mongo.ObjectID(req.params.id)},
        function(err,result){
            if(err) throw err;
            res.send(
                'User: ' + result[0].username + '</br>' + 
                'Password: ' + result[0].password + '</br>' + 
                'Email:' + result[0].email)
            }
    )

})

function getUsers(arg,callback){
    const userInfo = db.collection('users');
    userInfo.find(arg).toArray(callback);
}


