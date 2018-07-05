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
    res.send("hello world")
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
        'username':'Krystal.Anise',
        'password':'missnothing',
        'email':'krystal.anise@gmail.com'
    },{
        'username':'Luanne Charla',
        'password':'watermaloon',
        'email':'luanne.charla@gmail.com'
    },{
        'username':'Natalee Rikki',
        'password':'winstonsilverslim2468',
        'email':'natalee.rikki@hotmail.com'
    },{
        'username':'Floretta Roxana',
        'password':'winstonsilverslim2468',
        'email':'flo_roxxxana@yahoo.com'
    }
], callback)
}

app.get('/users',(req,res)=>{

    getUsers({},function(err,result){
        if (err) throw err;
        var usernames = '';
        for(let i=0; i< result.length; i+=1){
             usernames+= result[i].username + ', ' + 'User ID:    ' + result[i]._id +'</br>';
        }
        res.send('Search users by their userID </br> </br>'+'Users are: </br> </br> '+ usernames );
    })

})
app.get('/users/:id',(req,res)=>{
    getUsers({'_id': new mongo.ObjectID(req.params.id)},
        function(err,result){
            var singleUser=''
            if(err) throw err;
            for(let i=0; i< result.length; i+=1){
                res.send('User: ' + result[i].username + '</br>' +
                         'Password: ' + result[i].password + '</br>' +
                         'Email: ' + result[i].email
            )}
        }
    )

})

function getUsers(arg,callback){
    const userInfo = db.collection('users');
    userInfo.find(arg).toArray(callback);

}

function parseID(){
    
}

