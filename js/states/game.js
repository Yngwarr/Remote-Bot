states['game'] = {
	init: () => {},
	create: () => {
		game.world.setBounds(0, 0, 800, 600);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.arcade.gravity.y = 1200;
	},
	update: () => {},
}
