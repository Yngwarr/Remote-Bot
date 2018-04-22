let map;
let player;
let obj = {};
let command_label;

const TILE_SIZE = 16;

states['game'] = {
	init: () => {},
	create: () => {
		/* sprite groups for objects */
		obj['gate'] = game.add.group();
		obj['laser'] = game.add.group();
		obj['bridge'] = game.add.group();
		obj['spring'] = game.add.group();
		obj['plate'] = game.add.group();
		obj['door'] = game.add.group();
		obj['door_r'] = game.add.group();
		obj['door_g'] = game.add.group();
		obj['door_b'] = game.add.group();
		obj['turret'] = game.add.group();
		obj['lever'] = game.add.group();
		obj['card_r'] = game.add.group();
		obj['card_g'] = game.add.group();
		obj['card_b'] = game.add.group();

		game.physics.startSystem(Phaser.Physics.P2JS);

		/* tilemap of the world */
		map = game.add.tilemap('world', TILE_SIZE, TILE_SIZE);
		map.addTilesetImage('tiles');

		layer = map.createLayer(0);
		layer.resizeWorld();
		populate(map, layer);

		game.physics.p2.convertTilemap(map, layer);
		//game.physics.p2.restitution = 0.5;
		game.physics.p2.gravity.y = 300;

		/* player */
		player = game.add.sprite(32, 460, 'player');
		game.physics.p2.enable(player);
		player.body.fixedRotation = true;
		player.direction = 1;
		player.is_stopped = true;
		player.body.clearShapes();
		player.body.setCircle(7);

		game.physics.p2.setBoundsToWorld();

		//Binding input commands and executing by player
		init_input(game, cmd, player);
		// command title!
		let text = game.add.text(0, game.height - 18, '>> ', {
			font: '16px IBM',
			fill: '#ccc',
			align: 'center'
		});
	
		command_label = game.add.text(48, game.height - 18, '', {
			font: '16px IBM',
			fill: '#ccc',
			align: 'center'
		});

	},
	update: () => {
		if (!player.is_stopped) {
			if (player.direction < 0)
				player.body.moveLeft(100);
			else
				player.body.moveRight(100);
		}
	},
	render: ()=> {
		game.debug.body(player);
	}
}

function populate(map, layer) {
	/* set collidable tiles */
	map.setCollisionBetween(1,2);
	map.setCollisionBetween(5,6);
	map.setCollisionBetween(10,10);
	map.setCollisionBetween(16,18);
	/* turn tiles into sprites */
	map.createFromTiles(4, 0, 'gate', layer, obj['gate']);
	map.createFromTiles(5, 0, 'laser', layer, obj['laser']);
	map.createFromTiles(7, 0, 'bridge', layer, obj['bridge']);
	map.createFromTiles(8, 0, 'spring', layer, obj['spring']);
	map.createFromTiles(9, 0, 'plate', layer, obj['plate']);
	map.createFromTiles(10, 0, 'door', layer, obj['door']);
	map.createFromTiles(11, 0, 'turret', layer, obj['turret']);
	map.createFromTiles(12, 0, 'lever', layer, obj['lever']);
	map.createFromTiles(13, 0, 'card_r', layer, obj['card_r']);
	map.createFromTiles(14, 0, 'card_g', layer, obj['card_g']);
	map.createFromTiles(15, 0, 'card_b', layer, obj['card_b']);
	map.createFromTiles(16, 0, 'door_r', layer, obj['door_r']);
	map.createFromTiles(17, 0, 'door_g', layer, obj['door_g']);
	map.createFromTiles(18, 0, 'door_b', layer, obj['door_b']);
	/* add sprite animations */
	let anim_door = (sp) => {
		sp.animations.add('closed', [0], 30, true);
		sp.animations.add('open', [1,2,3,4,5,6,7], 30).onComplete
			.add(function () {
				this.animations.play('idle');
			}, sp);
		sp.animations.add('idle', [7], 30, true);
		sp.animations.play('closed');
	};
	let anim_card = (sp) => {
		sp.animations.add('idle', [0,1,2,3,4,3,2,1], 30, true);
		sp.animations.play('idle');
	};
	obj['gate'].forEach((sp) => {
		/* TODO add a particle effect */
		sp.animations.add('inactive', [0], 30, true);
		sp.animations.add('activate', [0,1,2,3,4,5,6,7,6,5,4], 30).onComplete
			.add(function () {
				this.animations.play('active');
			}, sp);
		sp.animations.add('active', [5,4], 5, true);
		sp.animations.play('inactive');
	}, this);
	obj['laser'].forEach((sp) => {
		/* TODO add more animation */
		sp.animations.add('idle', [0], 30, true);
		sp.animations.play('idle');
	}, this);
	obj['spring'].forEach((sp) => {
		/* TODO add interaction */
		sp.animations.add('idle', [0], 30, true);
		sp.animations.add('press', [1,2,3,4,4,5,5], 15).onComplete
			.add(function () {
				this.animations.play('release');
			}, sp);
		sp.animations.add('release', [4,3,2,1], 60).onComplete
			.add(function () {
				this.animations.play('idle');
			}, sp);
		sp.animations.play('idle');
	}, this);
	obj['door'].forEach(anim_door, this);
	obj['door_r'].forEach(anim_door, this);
	obj['door_g'].forEach(anim_door, this);
	obj['door_b'].forEach(anim_door, this);
	obj['turret'].forEach((sp) => {
		/* TODO needs rotation */
		sp.animations.add('idle', [0], 30, true);
		sp.animations.add('warmup', [1,2,3,4,5,6,7], 15).onComplete
			.add(function () {
				this.animations.play('fire');
			}, sp);
		sp.animations.add('fire', [7,7,8,8,7,7,8,8,7,7,8,8], 15).onComplete
			.add(function () {
				this.animations.play('idle');
			}, sp);
		sp.animations.play('idle');
	}, this);
	obj['lever'].forEach((sp) => {
		sp.animations.add('idle', [0], 30, true);
		sp.animations.add('toggle', [1,2]).onComplete.add(function () {
			this.animations.play('turned');
		}, sp);
		sp.animations.add('turned', [3], 30, true);
		sp.animations.play('idle');
	}, this);
	obj['card_r'].forEach(anim_card, this);
	obj['card_g'].forEach(anim_card, this);
	obj['card_b'].forEach(anim_card, this);
}
