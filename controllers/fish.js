// Import Dependencies
const express = require('express')
const Fish = require('../models/fish')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Fish.find({})
	.populate("comments.author", "username")
		.then(fish => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			
			res.render('fishs/index', { fish, username, loggedIn, userId })
		})
		.catch(err => res.redirect(`/error?error=${err}`))
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Fish.find({ owner: userId })
		.then(fishs => {
			res.render('fishs/index', { fish, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('fishs/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	console.log('this was returned from create', fish)
	Fish.create(req.body)
		.then(fish => {
			const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
			res.redirect('fishs/index')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	// we need to get the id
	const fishId = req.params.id
	Fish.findById(fishId)
		.then(fish => {
			res.render('fishs/edit', { fish, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	console.log("req.body initially", req.body)
	const fishId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false
	console.log('req.body after changing checkbox value', req.body)

	Fish.findByIdAndUpdate(fishId, req.body, { new: true })
		.then(fish => {
			if (fruit.owner == req.session.userId) {
                // must return the results of this query
                return fruit.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
		.then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/fishs/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// show route
router.get('/:id', (req, res) => {
	const fishId = req.params.id
	Fish.findById(fishId)
		.then(fish => {
            const {username, loggedIn, userId} = req.session
			res.render('fishs/show', { fish, username, loggedIn, userId })
		})
		.catch((err) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const fishId = req.params.id
	Fish.findByIdAndRemove(fishId)
		.then(fish => {
			res.redirect('/fishs')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
