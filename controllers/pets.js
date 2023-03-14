/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/pets`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all pets
// router.get('/', function (req, res) {
//     db.Pet.find({})
//         .then(pets => res.json(pets))
// })

router.get('/', function (req, res) {
    db.Pet.find({})
        .then(pets => {
            res.render('pet-index', {
                pets: pets
            })
        })
})

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new-pet', (req, res) => {
    res.render('new-pet')
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new volunteer document using the form data, 
// and redirects the user to the new volunteer's show page
router.post('/', (req, res) => {
    db.Pet.create(req.body)
        .then(pet => res.redirect('/pets'))
})


// Show Route (GET/Read): Will display an individual pet document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Pet.findById(req.params.id)
        .then(pet => {
            res.render('pet-details', {
                pet:pet
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing pet
router.get('/:id/edit', (req, res) => {
    db.Pet.findById(req.params.id)
        .then(pet => {
            res.render('edit-pet', {
                pet: pet
            })
        })
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Pet.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(pet => res.redirect('/pets'))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router