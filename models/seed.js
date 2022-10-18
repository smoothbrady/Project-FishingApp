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
    const startFishs = [
        {name: "Tarpon", bodyOfWater: "Freshwater", readyToCatch: true},
        {name: "Snook", bodyOfWater: "Euryhaline", readyToCatch: true},
        {name: "Redfish", bodyOfWater: "Saltwater", readyToCatch: true},
        {name: "Speckled Trout", bodyOfWater: "Salt-water", readyToCatch: true},
        {name: "Florida Largemouth Bass", bodyOfWater: "Freshwater", readyToCatch: true},
        {name: "Sheepshead", bodyOfWater: "Salt-water", readyToCatch: true},
        {name: "Kingfish", bodyOfWater: "Salt-water", readyToCatch: true},
        {name: "Gulf Flounder", bodyOfWater: "Salt-water", readyToCatch: true},
        {name: "Goliath Grouper", bodyOfWater: "Salt-water", readyToCatch: true},
        {name: "Bonnethead Shark", bodyOfWater: "Salt-water", readyToCatch: true}
    ]

     Fish.deleteMany({owner: null})
         .then(deletedFishs => {
             console.log('this is what .delteMany returns', deletedFishs)

            Fish.create(startFishs)
            .then(data => {
                console.log('new created fish', data)
                db.close()
            })
            .catch(error => {
                console.log('error inside fish create promise', error)
                db.close()
            })
        })
         .catch(error => {
             console.log(error)
             db.close()
         })
 })