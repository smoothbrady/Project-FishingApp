////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const FishRouter = require('./controllers/fishcontrollers')
const UserRouter = require('./controllers/userControllers')
const Path = require("path")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs two arguments
// the first, is the base url endpoint, the second is the file to use

app.use('/fruits', FruitRouter)
app.use('/comments', commentRouter)
app.use('/users', UserRouter)

// this renders an error page, gets the error from a url request query
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	// get session variables
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session

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
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

// END