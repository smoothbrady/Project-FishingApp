////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Fish = require("../models/fish")


const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST comment
// Nit: choose either double or single quotes
router.post("/:fishId", (req, res) => {
    const fishId = req.params.fishId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    Fish.findById(fishId)
    .then(fish => {
        fish.comments.push(req.body)
        return fish.save()
    })
    .then(fish => {
        res.redirect(`/fish/${fish.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// Delete comment
router.delete('/delete/:fishId/:commId', (req, res) => {
    // Nit: remove console.logs
    console.log("deleteroute")
    const fishId = req.params.fishId 
    const commId = req.params.commId
    Fish.findById(fishId)
        .then(fish => {
            const theComment = fish.comments.id(commId)
            // Nit: remove console.logs
            console.log('this is the comment that was found', theComment)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    // find some way to remove the comment
                    theComment.remove()
                    fish.save()
                    res.redirect(`/fish/${fish.id}`)
                    // return the saved fish
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error
        .catch(err => res.redirect(`/error?error=${err}`))
})

module.exports = router