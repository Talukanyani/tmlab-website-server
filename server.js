const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/client/build`))

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
});

// 404 handler
app.use((req, res, next) => {
  res.sendStatus(404)
});

// error handler
app.use((error, req, res, next) => {
  req.app.get('env') === 'development' && console.log(error)
  res.status(err.status || 500)
  res.send('Something went wrong')
});

module.exports = app;