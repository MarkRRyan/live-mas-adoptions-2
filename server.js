/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path')
const express = require('express')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload')

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models')

/* Create the Express app
--------------------------------------------------------------- */
const app = express()

/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer()
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/')
    }, 100)
})

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload())

/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.send('Live Mas Adoptions')
});

// When a GET request is sent to `/seedPets`, the pets collection is seeded
app.get('/seedPets', function (req, res) {
    // Remove any existing pets
    db.Pet.deleteMany({})
        .then(removedPets => {
            console.log(`Removed ${removedPets.deletedCount} tweets`)
            // Seed the pets collection with the seed data
            db.Pet.insertMany(db.seedPets)
                .then(addedPets => {
                    console.log(`Added ${addedPets.length} pets to be adopted`)
                    res.json(addedPets)
                })
        })
});

// When a GET request is sent to `/seedVolunteers`, the volunteers collection is seeded
app.get('/seedVolunteers', function (req, res) {
    // Remove any existing volunteers
    db.Volunteer.deleteMany({})
        .then(removedVolunteers => {
            console.log(`Removed ${removedVolunteers.deletedCount} dudes`)
            // Seed the volunteers collection with the seed data
            db.Volunteer.insertMany(db.seedPets)
                .then(addedVolunteers => {
                    console.log(`Added ${addedVolunteers.length} volunteers to help out`)
                    res.json(addedVolunteers)
                })
        })
});

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log("Pettin' them doggos on", process.env.PORT);
});