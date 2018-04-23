states['preload'] = {
	preload: () => {
		game.load.tilemap('world', 'map/level0.csv');
		game.load.image('tiles', 'img/tilemap.png');
		game.load.spritesheet('player', 'img/dawg.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('gate', 'img/gate.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_r', 'img/door_r.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_g', 'img/door_g.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('door_b', 'img/door_b.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_r', 'img/card_r.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_g', 'img/card_g.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('card_b', 'img/card_b.png', TILE_SIZE, TILE_SIZE);
		game.load.spritesheet('grad', 'img/grad.png', 1, 24);
		game.load.spritesheet('treasure', 'img/treasure.png',
			TILE_SIZE, TILE_SIZE);
		game.load.image('blank', 'img/blank.png');
		game.load.image('foe', 'img/foe.png');
		game.load.image('spike_u', 'img/spike_u.png');
		game.load.image('spike_l', 'img/spike_l.png');
		game.load.image('spike_r', 'img/spike_r.png');

		game.load.audio('turn', 'snd/turn.wav');
		game.load.audio('death', 'snd/death.wav');
		game.load.audio('jump', 'snd/jump.wav');
		game.load.audio('pick', 'snd/pick.wav');
	},
	create: () => {
		document.querySelector('canvas').oncontextmenu
			= function() { return false; };
		game.state.start('game');
	}
}
