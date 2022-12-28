const readline = require('readline')
const fs = require('fs')
const { Trie } = require('./trie.js')

const buildTrie = async () => {
	const trie = new Trie()

	const interface = readline.createInterface({
		input: fs.createReadStream('words.txt'),
	})

	let counter = 0
	// use first 200 words
	for await (const line of interface) {
		if (counter >= 200) interface.close()
		trie.put(line, counter)
		counter++
	}

	interface.on('close', () => {
		process.exit(0)
	})

	return trie
}

module.exports = buildTrie
