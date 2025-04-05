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

		return hashCode % this.#buckets.length;
	}

	set(key, value) {
		const index = this.#hash(key);

		if (index < 0 || index >= this.#buckets.length) {
			throw new Error("Trying to access index out of bounds");
		}

		const newNode = new Node(key, value);
		let currentNode = this.#buckets[index];

		if (!currentNode) {
			this.#buckets[index] = newNode;
			this.#size++;
			return;
		}

		while (currentNode.nextNode) {
			if (currentNode.key === key) {
				currentNode.value = value;
				return;
			}
			currentNode = currentNode.nextNode;
		}

		currentNode.nextNode = newNode;
		this.#size++;
	}

	get(key) {
		const index = this.#hash(key);

		let currentNode = this.#buckets[index];

		while (currentNode) {
			if (currentNode.key === key) return currentNode.value;
			currentNode = currentNode.nextNode;
		}

		return null;
	}
}
