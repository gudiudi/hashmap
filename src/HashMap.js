import Node from "./Node.js";

export default class HashMap {
	#capacity;
	#loadFactor;

	constructor() {
		this.#capacity = 12;
		this.#loadFactor = 0.75;
	}

	hash(key) {
		const primeNumber = 31;
		let hashCode = 0;

		for (const char of key) {
			hashCode = primeNumber * hashCode + char.charCodeAt();
		}

		return hashCode % this.#capacity;
	}
}
