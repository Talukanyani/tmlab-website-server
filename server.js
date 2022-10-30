const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const newsletter = require('./routes/newsletter')
const scNewsletter = require('./routes/sc-newsletter')
const contact = require('./routes/contact')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(cors({
//   origin: 'http://localhost:3000',
//   Credentials: true,
//   optionSucessStatus: 200
// }))

// console.log(process.env.NODE_ENV);

app.use(helmet())

app.use('/newsletter', newsletter)
app.use('/sc/notify_me', scNewsletter)
app.use('/contact', contact)

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
  res.status(error.status || 500)
  res.send('Something went wrong')
});

module.exports = app;

/* on production
set Enviroment to production ($env:NODE_ENV="production")
unenable cors() on this file
change nodemon to node on parkage.json file
change from devDB to proDB object on dBConfig.js file
*/

/* on development
set Enviroment to development ($env:NODE_ENV="development")
enable cors on this file
change node to nodemon(npm install globally) on parkage.json file
change from prodDB to devDB object on dBConfig.js file
*/