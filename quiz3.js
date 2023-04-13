const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(
      req.body.username,
      req.body.password
    )

    let token = generateToken(result) 
    res.send(token)
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/bye', verifyToken, (req, res) => {
    res.send('/bye bye gais')
  })

app.post('/register',(req,res) =>{
  res.send('Account Created')
} )

app.post('/register', (req, res) => {
    let result = register(
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.email
    )

    res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
      username: "aizat",
      password: "123456",
      name: "Aizat",
      email: "aizat@utem.edu.my"
  }
]

function login(username, password) {
  let matchUser = dbUsers.find(
      user => user.username == username      //=> what to do with user
  )
  if (!matchUser) return "User not found!"
  if (matchUser.password == password) 
  {
      return matchUser
  } else
  {
      return "Invalid password"
  }
}

function register(requsername, reqpassword, reqname, reqemail) {
dbUsers.push({
    username: requsername,
    password: reqpassword,
    name: reqname,
    email: reqemail
})
}

function generateToken(userData) {
  const token = jwt.sign(
    userData,
    'inipassword',
    {expiresIn: 60 }
  );
  return token
}

function verifyToken(req, res, next) {
  let header= req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err, decoded) {
    if(err) {
      res.send("Invalid Token")
    }

    req.user = decoded
    next()

  });
}
