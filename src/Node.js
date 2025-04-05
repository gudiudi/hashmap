export default class Node {
	#key;
	#value;
	#nextNode;

	constructor(key = null, value = null, nextNode = null) {
		this.#key = key;
		this.#value = value;
		this.#nextNode = nextNode;
	}

	get key() {
		return this.#key;
	}

	set key(newKey) {
		this.#key = newKey;
	}

	get value() {
		return this.#value;
	}

	set value(newValue) {
		this.#value = newValue;
	}

	get nextNode() {
		return this.#nextNode;
	}

	set nextNode(newNextNode) {
		this.#nextNode = newNextNode;
	}
}
