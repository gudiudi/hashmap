import HashMap from "./HashMap.js";

const map = new HashMap();

map.set("Sara", "red");
map.set("Rasa", "yellow");
map.set("Sara", "black");
console.log(map.get("Armin"));
console.log(map.get("Rasa"));
console.log(map.get("Sara"));
console.log(map.has("Rasaa"));
console.log(map.has("Sara"));

/*
Move linked list method to new linked list class!
*/
