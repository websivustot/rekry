const express = require('express')
const cors = require('cors');
const db = require('./db')
console.log(db.db[0].company)
const app = express()
const port = 3001

app.use(
    cors({
      origin: 'http://localhost:3000', // Allow requests from this origin
      methods: 'GET', // Allow only GET requests
    })
  );

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/jobs', (req, res) => {
    res.send(db.db)
  })

app.get('/jobs/:id', (req, res) => {
    //console.log("id:",req)
    const job = db.db.find((item) => item.id === req.params.id);
res.send(job)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})