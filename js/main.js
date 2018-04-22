let game;
let cmd;
let states = {};

function init() {
	const config = {
		width: 800,
		height: 600,
		renderer: Phaser.AUTO,
		parent: 'game',
		antialias: true,
		multiTexture: true
	};
	game = new Phaser.Game(config);
	cmd = new CMD();
  	for (let s in states) {
		game.state.add(s, states[s]);
	}
	game.state.start('preload');
}
