const readline = require('readline')
const fs = require('fs')
const { CompactTrie } = require('./compact-trie.js')

const buildTrie = async () => {
	const compactTrie = new CompactTrie()
	let db = []

	const interface = readline.createInterface({
		input: fs.createReadStream('words.txt'),
	})

	let counter = 0
	// use first 200 words
	for await (const line of interface) {
		if (counter >= 200) interface.close()
		db.push(line + '$')
		counter++
	}

	interface.on('close', () => {
		process.exit(0)
	})

	compactTrie.insert(db)

	return { compactTrie, db }
}

module.exports = buildTrie
