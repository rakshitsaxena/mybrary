const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    Author.find(searchOptions).then((authors) => {
        res.render('authors/index', { authors: authors, searchOptions: req.query })
    }).catch(() => {
        res.redirect('/')
    })

})

//New Author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() }) //these args get sent to ejs file (new doesn't create author in db yet)
})

//Create author route
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save()
        .then(() => {
            //res.redirect(`authors/${newAuthor.id}`)
            res.redirect('authors')
        }).catch((err) => {
            res.render('authors/new', {
                author: author,
                errorMessage: 'Error creating author'
            })
        })
})
module.exports = router