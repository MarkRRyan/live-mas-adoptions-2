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


// Show Route (GET/Read): Will display an individual pet document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Pet.findById(req.params.id)
        .then(pet => res.json(pet))
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router