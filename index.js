// Required node modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

// Declare express app instance
let app = express()

// Set the templating language to EJS
app.set('view engine', 'ejs')

// Use layouts
app.use(layouts)

// Tell express what folder to serve static files from
app.use(express.static('static'))

// Use body parser to decode the POST variables
app.use(express.urlencoded({ extended: false }))

// Set up method-override to look for a querystring attribute (_method)
app.use(methodOverride('_method'))

// Include all routes from routers/controllers
app.use('/players', require('./controllers/players'))
app.use('/teams', require('./controllers/teams'))

// Home route
app.get('/', (req, res) => {
    res.render('home')
})

// Catch-all route
app.get('*', (req, res) => {
    res.render('error')
})

// Listen on a specified port
app.listen(process.env.PORT || 3000, () => {
    console.log('Hello world... poker tour!')
})
