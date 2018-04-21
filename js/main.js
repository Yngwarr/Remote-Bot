let game;
let cmd;
let player;

function init() {
	const config = {
		width: 800,
		height: 600,
		renderer: Phaser.AUTO,
		parent: 'game',
		antialias: true,
		multiTexture: true,
		state: {
			preload: preload,
			create: create,
			update: update,
			render: render
		}
		//,transparent: true
	};
	game = new Phaser.Game(config);
	cmd = new CMD();
}

function preload() {}

function create() {
	// I need right click for gameplay this time
	document.querySelector('canvas').oncontextmenu
		= function() { return false; }; 
	//Binding input commands and executing by player
	init_input(game, cmd, player);
	// TODO arguable
	game.world.setBounds(0, 0, 800, 600);

	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1200;
}

function update() {}

function render() {}
