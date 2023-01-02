const UPDATE_TIME = 1000 / 60;

const canvas = document.getElementById('canvas');
const startWindow = document.getElementById('start-window');
const gameOverWindow = document.getElementById('game-over');
const score = document.getElementById('score');

const HP = document.getElementById('HP');
const kills = document.getElementById('kills');
const ctx = canvas.getContext('2d');

let timer = null;

let paused = true;

let cooldown = false;
    cooldownDuration = 300;


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function update() {
    if (keys['Escape']) {
        if (!paused) {
            paused = true;
            stop();
            startWindow.classList.add('start-window_active');
        } else {
            start();
        }
    }
    if (keys['KeyW']) {
        player.step('up')
    }
    if (keys['KeyA']) {
        player.step('left');
        player.image.src = 'img/char_left.png';
    }
    if (keys['KeyS']) {
        player.step('down')
    }
    if (keys['KeyD']) {
        player.step('right');
        player.image.src = 'img/char_right.png';
    }
    player.hitBox = getArea(player.x, player.y, player.width, player.height);

    if (!cooldown) {
        if (keys['ArrowUp'] && !keys['ArrowRight'] && !keys['ArrowDown'] && !keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'up'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (keys['ArrowUp'] && keys['ArrowRight'] && !keys['ArrowDown'] && !keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'upright'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (!keys['ArrowUp'] && keys['ArrowRight'] && !keys['ArrowDown'] && !keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'right'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (!keys['ArrowUp'] && keys['ArrowRight'] && keys['ArrowDown'] && !keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'downright'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (!keys['ArrowUp'] && !keys['ArrowRight'] && keys['ArrowDown'] && !keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'down'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (!keys['ArrowUp'] && !keys['ArrowRight'] && keys['ArrowDown'] && keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'downleft'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (!keys['ArrowUp'] && !keys['ArrowRight'] && !keys['ArrowDown'] && keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'left'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
        if (keys['ArrowUp'] && !keys['ArrowRight'] && !keys['ArrowDown'] && keys['ArrowLeft']) {
            shots.push(new Shot('img/shot.png', player.x + player.width / 2, player.y + player.height / 2, 'upleft'));
            cooldown = true;
            setTimeout(() => cooldown = false, cooldownDuration);
        }
    }

    // Pick objects
    objects.forEach(function(object) {
        player.hitBox.forEach(function(hitPoint) {
            object.pickArea.forEach(function(pickPoint) {
                if (!object.done && hitPoint === pickPoint) {
                    object.done = true;
                    player.hp++;
                    HP.innerHTML = player.hp;
                }
            })
        })
        if (object.done) {
            objects.splice(objects.indexOf(object), 1);
        }
    });

    shots.forEach(function(shot) {
        shot.step(shot.direction);
        shot.range -= 1;
        if (shot.range <= 0) {
            shots.splice(shot, 1);
        }
        if (shot.done) {
            shots.splice(shot, 1);
        }
        enemies.forEach(function(enemy) {
            if ((shot.x + shot.width >= enemy.x && shot.x <= enemy.x + enemy.width) && (shot.y + shot.height >= enemy.y && shot.y <= enemy.y + enemy.height)) {
                shot.done = true;
                enemy.hited = true;
            }
        });
    });

    enemies.forEach(function(enemy) {
        // Moving
        if (enemy.x > player.x + 0.5 * player.width) {
            enemy.step('left');
            enemy.image.src = `img/${enemy.name}/enemy_left.png`;
        }
        if (enemy.x + 0.5 * enemy.width < player.x) {
            enemy.step('right');
            enemy.image.src = `img/${enemy.name}/enemy_right.png`;
        }
        if (enemy.y > player.y) {
            enemy.step('up');
        }
        if (enemy.y < player.y) {
            enemy.step('down');
        }

        // Hitting player
        if((enemy.x >= player.x && enemy.x <= player.x + player.width) && (enemy.y <= player.y && enemy.y >= player.y - enemy.height)) {
            if(!player.immortal) {
                player.hited(enemy.strength);
                player.immortal = true;
                setTimeout(() => player.immortal = false, 3000)
            }
        }
        if((enemy.x >= player.x && enemy.x <= player.x + player.width) && (enemy.y >= player.y && enemy.y <= player.y + player.height)) {
            if(!player.immortal) {
                player.hited(enemy.strength)
                player.immortal = true;
                setTimeout(() => player.immortal = false, 3000)
            }
        }
        if((enemy.x <= player.x && enemy.x >= player.x - enemy.width) && (enemy.y <= player.y && enemy.y >= player.y - enemy.height)) {
            if(!player.immortal) {
                player.hited(enemy.strength)
                player.immortal = true;
                setTimeout(() => player.immortal = false, 3000)
            }
        }
        if((enemy.x <= player.x && enemy.x >= player.x - enemy.width) && (enemy.y >= player.y && enemy.y <= player.y + player.height)) {
            if(!player.immortal) {
                player.hited(enemy.strength)
                player.immortal = true;
                setTimeout(() => player.immortal = false, 3000)
            }
        }

        if (enemy.hited) {
            --enemy.hp;
            enemy.hited = false;
        }
        if (enemy.hp <= 0) {
            enemies.splice(enemies.indexOf(enemy), 1);
            ++player.kills;
            kills.innerHTML = player.kills;
        }
    });

    // Spawn enemy
    if (Math.random() >= 0.99) {
        let position = Math.random();
        if (position < 0.25) {
            enemies.push(new Enemy('img/enemy/enemy_left.png', getRandomInt(canvas.width), -50));
        }
        if (position >= 0.25 && position < 0.5) {
            enemies.push(new Enemy('img/enemy/enemy_left.png', -50, getRandomInt(canvas.height)));
        }
        if (position >= 0.5 && position < 0.75) {
            enemies.push(new Enemy('img/enemy/enemy_left.png', getRandomInt(canvas.width), canvas.height + 50));
        }
        if (position >= 0.75) {
            enemies.push(new Enemy('img/enemy/enemy_left.png', canvas.width + 50, getRandomInt(canvas.height)));
        }
    }
    // Spawn minotaur
    if (Math.random() >= 0.999) {
        let position = Math.random();
        if (position < 0.25) {
            enemies.push(new Minotaur('img/minotaur/enemy_left.png', getRandomInt(canvas.width), -50));
        }
        if (position >= 0.25 && position < 0.5) {
            enemies.push(new Minotaur('img/minotaur/enemy_left.png', -50, getRandomInt(canvas.height)));
        }
        if (position >= 0.5 && position < 0.75) {
            enemies.push(new Minotaur('img/minotaur/enemy_left.png', getRandomInt(canvas.width), canvas.height + 50));
        }
        if (position >= 0.75) {
            enemies.push(new Minotaur('img/minotaur/enemy_left.png', canvas.width + 50, getRandomInt(canvas.height)));
        }
    }

    // Spawn health
    if (Math.random() >= 0.9995) {
        objects.push(new Heart('img/heart.png', getRandomInt(canvas.width), getRandomInt(canvas.height)));
    }

    if (player.hp <= 0) {
        gameOver()
    }

	draw();
}

function start() {
	timer = setInterval(update, UPDATE_TIME); //Updating the game 60 times a second
}

function gameOver() {
    score.innerHTML = player.kills;
    gameOverWindow.classList.add('game-over_active');
    clearInterval(timer); //Game stop
	timer = null;
}

function drawChar(char) {
	if (char.loaded) {
        ctx.drawImage(char.image, char.x, char.y);
    }
}

function drawEnemy(enemy) {
	if (enemy.loaded) {
        ctx.drawImage(enemy.image, enemy.x, enemy.y);
    }
}

function drawShot(shot) {
	if (shot.loaded) {
        ctx.drawImage(shot.image, shot.x, shot.y);
    }
}

function drawObject(object) {
	if (object.loaded) {
        ctx.drawImage(object.image, object.x, object.y);
    }
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clearing the canvas
    drawChar(player);
    enemies.forEach(enemy => drawEnemy(enemy));
    shots.forEach(shot => drawShot(shot));
    objects.forEach(object => drawObject(object));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function stop() {
	clearInterval(timer); //Game stop
	timer = null;
}


//  initial canvas resizing and canvas resizing on window resizing
resize();
window.addEventListener("resize", resize);

//  listenning for keyboard events
window.addEventListener("keydown", function(e) {
    keyDown(e.code);
});

window.addEventListener("keyup", function(e) {
    keyUp(e.code);
});

// forbidding openning the context menu (right click)
canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault(); 
    return false; 
});



// player's object
let player = new Char('img/char_left.png', canvas.width / 2 - 17 / 2, canvas.height / 2 - 27);

let enemies = [];
let shots = [];
let objects = [];

(canvas).addEventListener("click", function() {
    if (paused) {
        start();
        paused = false;
        startWindow.classList.remove('start-window_active');
    } 
});

(startWindow).addEventListener("click", function() {
    if (paused) {
        start();
        paused = false;
        startWindow.classList.remove('start-window_active');
    } 
});




