let router = require('express').Router()
let db = require('../models')
let sequelize = require('sequelize')

router.get('/', (req, res) => {
    db.team.findAll()
    .then(teams  => {
        res.render('teams/index', { teams })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.post('/', (req, res) => {
    db.team.create(req.body)
    .then(() => {
        res.redirect('/teams')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/new', (req, res) => {
    res.render('teams/new')
})

router.get('/:id', (req, res) => {
    db.team.findOne({
        where: { id: req.params.id },
        include: [ db.player ]
    })
    .then(team => {
        res.render('teams/show', { team })
    }) 
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router