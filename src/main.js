import HashMap from "./HashMap.js";

const map = new HashMap();

map.set("Sara", "red");
map.set("Rasa", "yellow");
map.set("Armin", "white");
map.set("Adi", "green");
console.log(map.get("Armin"));
console.log(map.get("Rasa"));
console.log(map.get("Sara"));

console.log(map.remove("Sara"));
console.log(map.get("Sara"));

console.log(map.keys());
console.log(map.values());
// head rasa > sara
/*
Move linked list method to new linked list class!
*/
