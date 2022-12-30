class CompactTrieNode {
	constructor(
		value = undefined,
		depth = undefined,
		parent = undefined,
		index = undefined
	) {
		this.value = value
		this.depth = depth
		this.parent = parent
		this.index = index
		this.next = {}
	}
}

class CompactTrie {
	constructor() {
		this.root = new CompactTrieNode(0, 0)
	}

	insert(strings) {
		let u = this.root
		let d = 0
		let count = 1
		for (let i = 0; i < strings.length; i++) {
			let s = strings[i]
			let m = s.length
			while (d === u.depth && d < m && u.next[s[d]] !== undefined) {
				u = u.next[s[d]]
				d++
				while (d < u.depth && d < m && strings[u.index][d] === s[d]) {
					d++
				}
			}
			if (d < u.depth) {
				let p = u.parent
				let v = new CompactTrieNode(count, d, p, i)
				count++
				let j = u.index
				p.next[s[p.depth]] = v
				v.parent = p
				v.next[strings[j][v.depth]] = u
				u.parent = v
				u = v
			}
			let w = new CompactTrieNode(count, s.length, u, i)
			count++
			u.next[s[d]] = w
			w.parent = u
			u = this.root
			d = 0
		}
	}

	dfs(u, result, visited = {}) {
		visited[u.value] = true
		for (let key in u.next) {
			let next_node = u.next[key]
			if (visited[next_node.value]) continue
			result[u.next[key].index] = true
			this.dfs(u.next[key], result, visited)
		}
	}

	findAllOccurrences(p) {
		let u = this.root
		let d = 0
		let occurrences = {}
		while (d < p.length) {
			u = u.next[p[d]]
			if (u === undefined) {
				return Object.keys(occurrences)
			}
			d = u.depth
		}
		if (Object.keys(u.next).length === 0) {
			return [u.index]
		}
		this.dfs(u, occurrences)
		return Object.keys(occurrences)
	}
}

module.exports = { CompactTrie }
