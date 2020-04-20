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

router.put('/:id', (req, res) => {
    console.log('REQUEST BODY', req.body)
    db.team.update(
        req.body,
        { where: { id: req.params.id } }
    )
    .then(() => {
        res.redirect('/teams/' + req.params.id)
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.delete('/:id', (req, res) => {
    db.player.destroy({
        where: { teamId: req.params.id }
    })
    .then(() => {
        // Things worked-players on that team are gone
        // Safe to delete the team now
        db.team.destroy({
            where: { id: req.params.id }
        })
        .then(() => {
            res.redirect('/teams')
        })
        .catch(err => {
            console.log(err)
            res.render('error')
        })
        // End of inner query
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id/edit', (req, res) => {
    db.team.findOne({
        where: { id: req.params.id }
    })
    .then((team) => {
        res.render('teams/edit', { team })
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id/win', (req, res) => {
    db.player.update(
        { wins: sequelize.literal('wins + 1') },
        { where: { teamId: req.params.id }}
    )
    .then(() => {
        res.redirect('/teams')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

router.get('/:id/loss', (req, res) => {
    db.player.update(
        { losses: sequelize.literal('losses + 1') },
        { where: { teamId: req.params.id }}
    )
    .then(() => {
        res.redirect('/teams')
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})

module.exports = router