const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(
      req.body.username,
      req.body.password
    )

    res.send(result)
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/bye', (req, res) => {
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
