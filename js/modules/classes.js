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
        this.immortal = false;
        this.hited = function() {
            this.hp -= 1;
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
		this.x = x;
		this.y = y;
        this.height = 60;
        this.width = 48;
        this.hitBox = getArea(this.x, this.y, this.width, this.height);
        this.dead = false;
		this.loaded = false;

		this.image = new Image();
        this.image.src = image; 
		
		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });
    };

	step(direction) {
		if(direction === "up") {
            this.y -= 1
        }
        if(direction === "down") {
            this.y += 1
        }
        if(direction === "left") {
            this.x -= 1
        }
        if(direction === "right") {
            this.x += 1
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