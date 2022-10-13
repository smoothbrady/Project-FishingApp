////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const FishRouter = require('./controllers/fish')
const UserRouter = require('./controllers/user')
const CommentRouter = require('./controllers/comment')
const WeatherRouter = require('./controllers/weather')
const Path = require("path")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Models 
//////////////////////////////
const Fish = require('./models/fish')

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())


/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////
middleware(app)


/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs two arguments
// the first, is the base url endpoint, the second is the file to use

app.use('/fish', FishRouter)
app.use('/users', UserRouter)
app.use('/', WeatherRouter)

app.get('/', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

// this renders an error page, gets the error from a url request query
app.get('/error', (req, res) => {
	// get session variables
    const { username, loggedIn, userId } = req.session
	const error = req.query.error || 'This Page Does Not Exist'
	
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// this is a catchall route, that will redirect to the error page for anything that doesn't satisfy a controller
// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})

//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

// END