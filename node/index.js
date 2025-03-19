import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Pedro test</h1>')
})

app.listen(port, () => {
    console.log('Server running port ' + port )
})
