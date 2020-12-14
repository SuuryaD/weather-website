const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs')
app.set('views' , path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req , res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Surya'
    })
})

app.get('/about', (req , res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Surya'
    })
})


app.get('/help', (req , res) => {
    res.render('help', {
        title: 'help page',
        name: 'Surya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address, (error , {latitude, longitude, location} = {}) => {
        if(error)
          return res.send({
              error: error
          })
    
        forecast(latitude, longitude, (error, forecastdata) => {
          if(error)
            return res.send({
                error: error
            })
            
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        
        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'error',
      name: 'surya',
      message: 'Help page not found'  
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'error',
        name: 'Surya',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running')
})