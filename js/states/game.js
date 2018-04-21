let map;
let player;

const TILE_SIZE = 16;

states['game'] = {
	init: () => {},
	create: () => {
		game.physics.startSystem(Phaser.Physics.P2JS);

		/* tilemap of the world */
		map = game.add.tilemap('world', TILE_SIZE, TILE_SIZE);
		map.addTilesetImage('tiles');

		layer = map.createLayer(0);
		layer.resizeWorld();
		/* TODO change with collidable objects */
		map.setCollisionBetween(1,2);

		game.physics.p2.convertTilemap(map, layer);
		//game.physics.p2.restitution = 0.5;
		game.physics.p2.gravity.y = 300;

		/* player */
		player = game.add.sprite(32, 460, 'player');
		game.physics.p2.enable(player);
		player.body.fixedRotation = true;

		game.physics.p2.setBoundsToWorld();
	},
	update: () => {},
}
