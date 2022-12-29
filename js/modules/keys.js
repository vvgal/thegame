function keyDown(e) {
	keys[e] = true;
}

function keyUp(e) {
	delete keys[e];
}

let keys = {}