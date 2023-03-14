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
// const volunteer = require('../models/volunteer')
// const volunteers = require('../models/seedVolunteer')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all volunteers
router.get('/', function (req, res) {
    db.Volunteer.find({})
        .then(volunteers => {
            res.render('volunteer-index', {
                volunteers: volunteers
            })
        })
})

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new-volunteer', (req, res) => {
    res.render('new-volunteer')
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new volunteer document using the form data, 
// and redirects the user to the new volunteer's show page
router.post('/', (req, res) => {
    db.Volunteer.create(req.body)
        .then(volunteer => res.redirect('/volunteers'))
})


// Show Route (GET/Read): Will display an individual volunteer document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Volunteer.findById(req.params.id)
        .then(volunteer => res.json(volunteer))
        .catch(() => res.send('404 Error: Page Not Found'))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing volunteer
router.get('/:id/edit-volunteer', (req, res) => {
    db.Volunteer.findById(req.params.id)
        .then(volunteer => {
            res.render('edit-volunteer', {
                volunteer: volunteer
            })
        })
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Volunteer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(volunteer => res.redirect('/volunteers'))
})

// Destroy Route (DELETE/Delete): This route deletes a volunteer document 
// using the URL parameter (which will always be the volunteer document's ID)
router.delete('/:id', (req, res) => {
    db.Volunteer.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/volunteers'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router