import Node from "./Node.js";

export default class HashMap {
	#capacity;
	#loadFactor;
	#buckets;
	#size;

	constructor() {
		this.#capacity = 12;
		this.#loadFactor = 0.75;
		this.#buckets = new Array(this.#capacity).fill(null);
		this.#size = 0;
	}

	#hash(key) {
		const primeNumber = 31;
		let hashCode = 0;

		for (const char of key) {
			hashCode = primeNumber * hashCode + char.charCodeAt();
		}

		return Math.abs(hashCode) % this.#buckets.length;
	}

	#search(key, callback = (node) => node.key === key) {
		const index = this.#hash(key);
		let currentNode = this.#buckets[index];

		while (currentNode) {
			if (callback(currentNode)) return currentNode;
			currentNode = currentNode.nextNode;
		}

		return null;
	}

	set(key, value) {
		const node = this.#search(key);
		if (node) {
			node.value = value;
			return;
		}

		const index = this.#hash(key);
		const newNode = new Node(key, value, this.#buckets[index]);
		this.#buckets[index] = newNode;
		this.#size++;
	}

	get(key) {
		const node = this.#search(key);
		return node?.value ?? null;
	}

	has(key) {
		return !!this.#search(key);
	}
}
