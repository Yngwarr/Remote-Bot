states['preload'] = {
	preload: () => {
		game.load.tilemap('world', 'map/level0.csv');
		game.load.image('tiles', 'img/tilemap.png');
		game.load.image('player', 'img/dawg.png');
	},
	create: () => {
		document.querySelector('canvas').oncontextmenu
			= function() { return false; };
		game.state.start('game');
	}
}
