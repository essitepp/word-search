const ALPHABET =
	"0123456789&.'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-"

class Node {
	constructor(value = undefined) {
		this.value = value
		this.next = {}
	}
}

class Trie {
	constructor() {
		this.root = new Node()
	}

	#get = (node, key, d) => {
		if (node === undefined) return undefined
		if (d == key.length) return node
		let c = key.charAt(d)
		return this.#get(node.next[c], key, d + 1)
	}

	get(key) {
		let node = this.#get(this.root, key, 0)
		if (node === undefined) return undefined
		return node.value
	}

	#put = (node, key, value, d) => {
		if (node === undefined) node = new Node()
		if (d === key.length) {
			node.value = value
			return node
		}
		let c = key.charAt(d)
		node.next[c] = this.#put(node.next[c], key, value, d + 1)
		return node
	}

	put(key, value) {
		this.root = this.#put(this.root, key, value, 0)
	}

	collect(node, prefix, queue) {
		if (node === undefined) return
		if (node.value !== undefined) queue.push(prefix)
		for (let c = 0; c < ALPHABET.length; c++) {
			this.collect(node.next[ALPHABET[c]], prefix + ALPHABET[c], queue)
		}
	}

	// prefix match for autocomplete
	keysWithPrefix(prefix) {
		let queue = []
		this.collect(this.#get(this.root, prefix, 0), prefix, queue)
		return queue
	}

	keys() {
		return this.keysWithPrefix('')
	}
}

module.exports = { Node, Trie }
