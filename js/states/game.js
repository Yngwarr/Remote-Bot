let map;
let player;
let command_label;

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
		player.cur_dirrection = 1;
		player.is_stopped = true;

		game.physics.p2.setBoundsToWorld();

		//Binding input commands and executing by player
		init_input(game, cmd, player);
		// command title!
		let text = game.add.text(5, game.world.height, `cmd: `, {
			font: "18px Monospace",
			fill: "#ccc",
			align: "center"
		});
	
		command_label = game.add.text(50, game.world.height, "", {
			font: "18px Monospace",
			fill: "#ccc",
			align: "center"
		});

	},
	update: () => {
		if (!player.is_stopped) {
			if (player.cur_dirrection < 0)
				player.body.moveLeft(100);
			else
				player.body.moveRight(100);
		}
	},
}
