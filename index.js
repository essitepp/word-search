require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const buildTrie = require('./word-trie.js')

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))

app.use(
	'/lib/jquery',
	express.static(path.join(__dirname, 'node_modules/jquery/dist'))
)

let trie

app.use(async (req, res, next) => {
	if (!trie) {
		trie = await buildTrie()
	}
	next()
})

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.get('/search', (req, res) => {
	let searchWord = req.query.word
	let searchResult = trie.get(searchWord)
	console.log(searchResult)
	res.send()
})

app.listen(process.env.PORT || 3000)
