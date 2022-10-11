///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Fish = require('./fish')

///////////////////////////////////////
/// Send Script
///////////////////////////////////////
const db = mongoose.connection

db.on('open', () => {
    // Bringing in the array for fishes
    const startFish = [
        {name: "Tarpon", BodyOfWater: "Freshwater", readyToCatch: false},
        {name: "Snook", BodyOfWater: "Euryhaline", readyToCatch: false},
        {name: "Redfish", BodyOfWater: "Saltwater", readyToCatch: false},
        {name: "Speckled Trout", BodyOfWater: "Salt-water", readyToCatch: false},
        {name: "Florida Largemouth Bass", BodyOfWater: "Freshwater", readyToCatch: false},
        {name: "Sheepshead", BodyOfWater: "Salt-water", readyToCatch: false},
        {name: "Kingfish", BodyOfWater: "Salt-water", readyToCatch: false},
        {name: "Gulf Flounder", BodyOfWater: "Salt-water", readyToCatch: false},
        {name: "Goliath Grouper", BodyOfWater: "Salt-water", readyToCatch: false},
        {name: "Bonnethead Shark", BodyOfWater: "Salt-water", readyToCatch: false},
    ]

    Fish.deleteMany({})
        .then(deletedFish => {
            console.log('this is what .delteMany returns', deletedFish)

            Fish.create(startFish)
            .then(data => {
                console.log('new created fish', data)
                db.close()
            })
            .catch(error => {
                db.close()
            })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})