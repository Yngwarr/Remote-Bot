states['preload'] = {
	preload: () => {
		game.load.tilemap('world', 'map/level0.csv');
		game.load.image('tiles', 'img/tilemap.png');
		game.load.image('player', 'img/dawg.png');
		game.load.spritesheet('gate', 'img/gate.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('laser', 'img/laser.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('bridge', 'img/bridge.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('spring', 'img/spring.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('plate', 'img/plate.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door', 'img/door.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_r', 'img/door_r.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_g', 'img/door_g.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_b', 'img/door_b.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('turret', 'img/turret.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('lever', 'img/lever.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_r', 'img/card_r.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_g', 'img/card_g.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_b', 'img/card_b.png', TILE_SIZE, TILE_SIZE);
		game.load.image('blank', 'img/blank.png');
	},
	create: () => {
		document.querySelector('canvas').oncontextmenu
			= function() { return false; };
		game.state.start('game');
	}
}
