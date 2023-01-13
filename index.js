require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const buildTrie = require('./word-trie.js')
const app = express()

app.set('view engine', 'ejs')

app.use(morgan('dev'))

app.use(
	'/lib/jquery',
	express.static(path.join(__dirname, 'node_modules/jquery/dist'))
)

let compactTrie, db

app.use(async (req, res, next) => {
	if (!compactTrie) ({ compactTrie, db } = await buildTrie())
	next()
})

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.get('/search', (req, res) => {
	const occurrences = getOccurrences(req.query.word)
	console.log(occurrences)
	res.render('index.ejs', { occurrences: occurrences })
})

app.get('/words', (req, res) => {
	const occurrences = getOccurrences(req.query.prefix)
	res.json(occurrences)
})

const getOccurrences = searchWord => {
	let searchResult = compactTrie.findAllOccurrences(searchWord)
	let occurrences = []
	// could make here a db call
	for (let i = 0; i < searchResult.length; i++) {
		let string = db[Number([searchResult[i]])]
		occurrences.push(string.substring(0, string.length - 1)) // removes the dollar sign
	}
	return occurrences
}

app.listen(process.env.PORT || 3000)
