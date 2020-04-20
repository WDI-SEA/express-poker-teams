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

router.delete('/:id', (req, res) => {
    db.player.destroy({
        where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/players')
    })
    .catch(err => {
        console.log('Error in delete route', err)
        res.render('error')
    })
})

router.put('/:id', (req, res) => {
    db.player.update(
        req.body,
        { where: { id: req.params.id }}
    )
    .then(() => {
        res.redirect('/players/' + req.params.id)
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id/edit', (req, res) => {
    db.team.findAll()
    .then(teams => {
        db.player.findOne({
            where: { id: req.params.id }
        })
        .then(player => {
            res.render('players/edit', { teams, player })
        })
        .catch(err => {
            console.log(err)
            res.render('error')
        }) // end of player query
    })
    .catch(err => {
        console.log('Error in edit route', err)
        res.render('error')
    }) // end of the team query
})

module.exports = router