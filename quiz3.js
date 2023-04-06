const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    res.send('login')
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/bye', (req, res) => {
    res.send('/bye bye gais')
  })



app.post('/register', (req, res) => {
    res.send('account create')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

