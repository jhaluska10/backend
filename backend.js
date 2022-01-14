
const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 


app.get('/users', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    console.log(id);
    if (name != undefined && id != undefined){
        let result = findUserByNameandID(name, id);
        console.log(result)
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined ){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        console.log(users);
        res.send(users);
    }
});


const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByNameandID = (name, id) => { 
    return users['users_list'].filter( (user) => (user['name'] === name && user['id'] === id)); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function randId(user){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
    var numChar = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var charactersLength = numChar.length;
    for ( var i = 0; i < 3; i++ ) {
        result += numChar.charAt(Math.floor(Math.random() * charactersLength));
    }
    user.id = result;
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    let result = users['users_list'].findIndex( (user) => user['id'] === id);
    if (result === -1 ){
        res.status(404).send('Resource not found.');
    }
    else {
           users['users_list'].splice(result, 1); 
    }
    res.status(204).send();
});
 

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    randId(userToAdd);
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


 
