import Node from "./Node.js";

export default class HashMap {
	#capacity;
	#loadFactor;
	#buckets;
	#size;

	constructor() {
		this.#capacity = 16;
		this.#loadFactor = 0.75;
		this.#buckets = new Array(this.#capacity).fill(null);
		this.#size = 0;
	}

	set(key, value) {
		if (this.#size >= this.#capacity * this.#loadFactor) this.#resize();

		const { currentNode } = this.#search(key);
		if (currentNode) {
			currentNode.value = value;
			return;
		}

		const index = this.#hash(key);
		const newNode = new Node(key, value, this.#buckets[index]);
		this.#buckets[index] = newNode;
		this.#size++;
	}

	get(key) {
		const { currentNode } = this.#search(key);
		return currentNode?.value ?? null;
	}

	has(key) {
		return !!this.#search(key).currentNode;
	}

	remove(key) {
		const { prevNode, currentNode } = this.#search(key);

		if (!currentNode) return false;

		const index = this.#hash(key);

		if (!prevNode) {
			this.#buckets[index] = currentNode.nextNode;
		} else {
			prevNode.nextNode = currentNode.nextNode;
		}

		this.#size--;
		return true;
	}

	clear() {
		this.#buckets = new Array(this.#capacity).fill(null);
		this.#size = 0;
	}

	keys() {
		const result = [];
		this.#traverseBuckets(this.#buckets, (node) => result.push(node.key));
		return result;
	}

	get size() {
		return this.#size;
	}

	#hash(key) {
		if (typeof key !== "string") throw new Error("Key must be a string");
		if (key.length === 0) throw new Error("Key cannot be empty");

		const primeNumber = 31;
		let hashCode = 0;

		for (const char of key) {
			hashCode = primeNumber * hashCode + char.charCodeAt();
		}

		return Math.abs(hashCode) % this.#buckets.length;
	}

	#search(key, callback = (node) => node.key === key) {
		const index = this.#hash(key);
		let prevNode = null;
		let currentNode = this.#buckets[index];

		while (currentNode) {
			if (callback(currentNode)) return { prevNode, currentNode };
			prevNode = currentNode;
			currentNode = currentNode.nextNode;
		}

		return { prevNode: null, currentNode: null };
	}

	#resize() {
		const oldBuckets = this.#buckets;
		this.#capacity *= 2;
		this.clear();
		this.#traverseBuckets(oldBuckets, (node) => this.set(node.key, node.value));
	}

	#traverseBuckets(buckets, callback) {
		for (const headNode of buckets) {
			if (!headNode) continue;
			let currentNode = headNode;
			while (currentNode) {
				callback(currentNode);
				currentNode = currentNode.nextNode;
			}
		}
	}
}
