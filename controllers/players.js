let router = require('express').Router()
let db = require('../models')

router.get('/', (req, res) => {
    db.player.findAll()
    .then(players => {
        res.render('players/index', { players })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.post('/', (req, res) => {
    db.player.create(req.body)
    .then(() => {
        res.redirect('/players')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/new', (req, res) => {
    db.team.findAll()
    .then(teams => {
        res.render('players/new', { teams })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id', (req, res) => {
    db.player.findOne({
        where: { id: req.params.id },
        include: [ db.team ]
    })
    .then(player => {
        res.render('players/show', { player })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router