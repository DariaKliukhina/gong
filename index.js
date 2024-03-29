const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile('index.html')
})

app.listen(PORT, () => {
  console.log('made with 💜');
})