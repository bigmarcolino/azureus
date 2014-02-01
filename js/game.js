function confirmGameOver(score){
	var r = confirm("Game Over.\nYour score: " + score + ". Play again?");
	
	if (r==true){
		location.href="game.html";
	}
	else{
		location.href="index.html";
	}
}

enchant();
var width = screen.width + 15;
var height = screen.height;
var game = new Core(width, height);
game.preload('images/player.png', 'images/attack.png', 'images/enemy.png', 'images/ally.png');
game.fps = 20;

game.onload = function(){
	var Player = enchant.Class.create(enchant.Sprite, {
		initialize: function(){
			enchant.Sprite.call(this, 50, 61);
			this.image = game.assets['images/player.png'];
			this.frame = 5;                   
			game.rootScene.addChild(this);
		}
	});

	var Attack = enchant.Class.create(enchant.Sprite, {
		initialize: function(){
			enchant.Sprite.call(this, 8, 8);
			this.image = game.assets['images/attack.png'];
			this.moveTo(player.x + 18, 60);       
			this.tl.moveBy(0, height, 30);      
			this.frame = 15;                  
			game.rootScene.addChild(this);
		}
	});

	var Enemy = enchant.Class.create(enchant.Sprite, {
		initialize: function(){
			enchant.Sprite.call(this, 35, 30);
			this.image = game.assets['images/enemy.png'];
			this.moveTo(Math.floor(Math.random() * width), height); 
            this.scaleX = -1;
            this.tl.moveBy(0, -height-height/8, height * ((Math.random()+50) % 0.9));
			game.rootScene.addChild(this);
		}
	});
	
	var Ally = enchant.Class.create(enchant.Sprite, {
		initialize: function(){
			enchant.Sprite.call(this, 24, 29);
			this.image = game.assets['images/ally.png'];
			this.moveTo(Math.floor(Math.random() * width), height); 
            this.scaleX = -1;
            this.tl.moveBy(0, -height-height/8, height * ((Math.random()+50) % 0.9));
			game.rootScene.addChild(this);
		}
	});

	var player = new Player();

	game.rootScene.tl.then(function() {
		var enemy = new Enemy();
		if (paused)
			game.pause();
	}).delay(Math.random()).loop();

	game.rootScene.tl.then(function() {
		var ally = new Ally();
		if (paused){
			game.pause();
		}
	}).delay(Math.random()*22).loop();  

	game.rootScene.on('touchstart', function(evt){
		player.x = evt.localX;
		var attack = new Attack();
	});

	game.rootScene.on('touchmove', function(evt){
		player.x = evt.localX;
	});
	
	game.rootScene.on('enterframe', function(){
		var hits = Attack.intersect(Enemy);
		for(var i = 0, len = hits.length; i < len; i++){
			game.rootScene.removeChild(hits[i][0]);
			game.rootScene.removeChild(hits[i][1]);
			score++;
			document.getElementById('score').innerHTML = "Score: " + score;
		}
	});
	
	game.rootScene.on('enterframe', function(){
		var hitsAlly = Attack.intersect(Ally);
		for(var i = 0, len = hitsAlly.length; i < len; i++){
			game.rootScene.removeChild(hitsAlly[i][0]);
			game.rootScene.removeChild(hitsAlly[i][1]);
			confirmGameOver(score);
			game.stop();
		}
	});

	setInterval(function(){
		if(paused == false){
			if(timeS > 0){
				timeS--;
				document.getElementById('time').innerHTML = timeS + "s left";
			}
		}
		else{
			clearTimeout(timetoOver);
		}
	}, 1000);
	
	timetoOver = setTimeout(function(){	
		confirmGameOver(score);
		game.stop();
	}, 60000);
};

game.start();