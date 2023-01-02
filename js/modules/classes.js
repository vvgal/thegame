function getArea(x, y, width, height) {
    let areaX = [...Array(width).keys()];
    let areaY = [...Array(height).keys()];
    let area = [];
    areaX.forEach(elementX => {
        areaY.forEach(elementY => {
            area.push(String(Math.round(elementX + x)) + ':' + String(Math.round(elementY + y)));
        });
    });
    return area
}

class Char {
	constructor(image, x, y) {
		this.x = x;
		this.y = y;
        this.height = 57;
        this.width = 34;
        this.orientation = 'left';
		this.loaded = false;
        this.speed = 3;
        this.hp = 3;
        this.kills = 0;
        this.hitBox = getArea(this.x, this.y, this.width, this.height);
        this.immortal = false;
        this.hited = function(strength) {
            this.hp -= strength;
            HP.innerHTML = this.hp;
        };


		this.image = new Image();
        this.image.src = image; 
		
		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };

	step(direction) {
		if(direction === "up") {
            this.y -= this.speed
        }
        if(direction === "down") {
            this.y += this.speed
        }
        if(direction === "left") {
            this.x -= this.speed
        }
        if(direction === "right") {
            this.x += this.speed
        }
    }
}

class Enemy {
	constructor(image, x, y) {
        this.name = 'enemy';
		this.x = x;
		this.y = y;
        this.height = 60;
        this.width = 48;
        this.hp = 1;
        this.strength = 1;
        this.hited = false;
        this.speed = 2;
        this.dead = false;
		this.loaded = false;

		this.image = new Image();
        this.image.src = image; 
		
		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };

	step(direction) {
		if(direction === "up") {
            this.y -= this.speed * Math.random();
        }
        if(direction === "down") {
            this.y += this.speed * Math.random();
        }
        if(direction === "left") {
            this.x -= this.speed * Math.random() * 1.41;
        }
        if(direction === "right") {
            this.x += this.speed * Math.random() * 1.41;
        }
    }
}

class Minotaur {
	constructor(image, x, y) {
        this.name = 'minotaur';
		this.x = x;
		this.y = y;
        this.height = 182;
        this.width = 109;
        this.speed = 1;
        this.hp = 10;
        this.strength = 3;
        this.hited = false;
        this.dead = false;
		this.loaded = false;

		this.image = new Image();
        this.image.src = image; 
		
		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };

	step(direction) {
		if(direction === "up") {
            this.y -= this.speed * Math.random();
        }
        if(direction === "down") {
            this.y += this.speed * Math.random();
        }
        if(direction === "left") {
            this.x -= this.speed * Math.random() * 1.41;
        }
        if(direction === "right") {
            this.x += this.speed * Math.random() * 1.41;
        }
    }
}

class Shot {
	constructor(image, x, y, direction) {
		this.x = x;
		this.y = y;
        this.height = 3;
        this.width = 3;
        this.direction = direction;
        this.speed = 10;
        this.range = 600;
        this.hitArea = getArea(this.x, this.y, this.width, this.height);
        this.done = false;
		this.loaded = false;

		this.image = new Image();
        this.image.src = image; 
		
		let obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };

	step(direction) {
		if(direction === "up") {
            this.y -= this.speed;
            this.range -= this.speed;
        }
        if(direction === "upright") {
            this.y -= this.speed;
            this.x += this.speed;
            this.range -= this.speed;
        }
        if(direction === "right") {
            this.x += this.speed;
            this.range -= this.speed;
        }
        if(direction === "downright") {
            this.y += this.speed;
            this.x += this.speed;
            this.range -= this.speed;
        }
        if(direction === "down") {
            this.y += this.speed;
            this.range -= this.speed;
        }
        if(direction === "downleft") {
            this.y += this.speed;
            this.x -= this.speed;
            this.range -= this.speed;
        }
        if(direction === "left") {
            this.x -= this.speed;
            this.range -= this.speed;
        }
        if(direction === "upleft") {
            this.y -= this.speed;
            this.x -= this.speed;
            this.range -= this.speed;
        }
    }
}

class Heart {
	constructor(image, x, y) {
		this.x = x;
		this.y = y;
        this.height = 16;
        this.width = 16;
        this.pickArea = getArea(this.x, this.y, this.width, this.height);
        this.done = false;
		this.loaded = false;

		this.image = new Image();
        this.image.src = image; 
		
		let obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };
}