/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path')
const express = require('express')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload')
const methodOverride = require('method-override')

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const petsCtrl = require('./controllers/pets')
const volunteersCtrl = require('./controllers/volunteers')

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
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));

/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    db.Pet.find({ isFeatured: true })
        .then(pets => {
            res.render('home', {
                pets: pets
            })
        })
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
app.get('/seedVolunteer', function (req, res) {
    // Remove any existing volunteers
    db.Volunteer.deleteMany({})
        .then(removedVolunteers => {
            console.log(`Removed ${removedVolunteers.deletedCount} dudes`)
            // Seed the volunteers collection with the seed data
            db.Volunteer.insertMany(db.seedVolunteer)
                .then(addedVolunteers => {
                    console.log(`Added ${addedVolunteers.length} volunteers to help out`)
                    res.json(addedVolunteers)
                })
        })
});

// This tells our app to look at the `controllers/pets.js` file 
// to handle all routes that begin with `localhost:3000/pets`
app.use('/pets', petsCtrl)
app.use('/volunteers', volunteersCtrl)

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log("Pettin' them doggos on", process.env.PORT);
});