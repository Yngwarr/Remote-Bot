let game;
let cmd;
let states = {};
let last_commands = [];
let id_command = 0;
let history_limit = 30;


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

function preload() {}

function create() {
	// I need right click for gameplay this time
	document.querySelector('canvas').oncontextmenu
		= function() { return false; }; 
	// TODO arguable
	game.world.setBounds(0, 0, 800, 600);

	game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1200;
}

function update() {}

function render() {}