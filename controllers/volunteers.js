/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/volunteers`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')
// const volunteers = require('../models/seedVolunteer')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all volunteers
router.get('/', function (req, res) {
    db.Volunteer.find({})
        .then(volunteers => res.json(volunteers))
})


// Show Route (GET/Read): Will display an individual volunteer document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Volunteer.findById(req.params.id)
        .then(volunteer => res.json(volunteer))
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router