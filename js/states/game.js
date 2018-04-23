let map, layer;
let player;
/* sprite groups for objects */
let obj = {};
/* a prompt for a command line */
let command_label;
let grad;

let active_gate;

const TILE_SIZE = 16;
const GRAVITY = 300;
const SPEED = 80;
const JUMP_HEIGHT = 180;

states['game'] = {
	init: () => {},
	create: () => {
		/* sprite groups for objects */
		obj['spike_u'] = game.add.group();
		obj['spike_l'] = game.add.group();
		obj['spike_r'] = game.add.group();
		obj['gate'] = game.add.group();
		obj['door_r'] = game.add.group();
		obj['door_g'] = game.add.group();
		obj['door_b'] = game.add.group();
		obj['card_r'] = game.add.group();
		obj['card_g'] = game.add.group();
		obj['card_b'] = game.add.group();
		obj['anomaly'] = game.add.group();
		obj['foe'] = game.add.group();
		obj['foe_brd'] = game.add.group();
		obj['treasure'] = game.add.group();

		game.physics.startSystem(Phaser.Physics.ARCADE);

		/* tilemap of the world */
		map = game.add.tilemap('world', TILE_SIZE, TILE_SIZE);
		map.addTilesetImage('tiles');

		layer = map.createLayer(0);
		layer.resizeWorld();
		populate(map, layer);
		active_gate = obj.gate.getAt(0);

		/* player */
		player = game.add.sprite(32, 550, 'player');
		game.physics.arcade.enable(player);
		//player.body.setSize(14,14,1,1);
		// silly hack
		player.body.setSize(2,14,7,1);
		player.body.gravity.y = GRAVITY;
		player.body.maxVelocity.y = 500;
		player.body.fixedRotation = true;
		player.direction = 1;
		player.is_stopped = true;
		player.is_climbing = false;
		player.on_ladder = [false, false];

		//Binding input commands and executing by player
		init_input(game, cmd, player);

		grad = game.add.sprite(0, 576, 'grad');
		grad.width = 800;
		grad.animations.add('idle', [0], 60, true);
		grad.animations.add('blink', [1,2,3,4,5,6,7,6,5,4,3,2,1,0,
			1,2,3,4,5,6,7,6,5,4,3,2,1], 60).onComplete.add((sp) => {
				sp.play('idle');
			});
		grad.play('idle');
		let text = game.add.text(0, game.height - 18, '>> ', {
			font: '16px IBM',
			fill: '#9d9d9d',
			align: 'center'
		});
	
		command_label = game.add.text(48, game.height - 18, '', {
			font: '16px IBM',
			fill: '#9d9d9d',
			align: 'center'
		});
	},
	update: () => {
		player.on_ladder[0] = player.on_ladder[1];
		player.on_ladder[1] = false;

		let door_collide = (pl, door) => {
			if (door.animations.currentAnim.name === 'closed') return true;
			else return false;
		};
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(player, obj['foe'], (pl, f) => {
			die();
		});
		game.physics.arcade.overlap(obj['foe'], obj['foe_brd'], (f, b) => {
			f.body.velocity.x *= -1;
		});
		game.physics.arcade.overlap(player, obj['treasure'], (pl, t) => {
			/* TODO happy end */
		});
		game.physics.arcade.collide(player, obj['door_r'], null, door_collide);
		game.physics.arcade.collide(player, obj['door_g'], null, door_collide);
		game.physics.arcade.collide(player, obj['door_b'], null, door_collide);
		game.physics.arcade.overlap(player, obj['card_r'], (pl, card) => {
			/* TODO add animations */
			obj['door_r'].forEach((door) => { door.play('open'); });
			card.destroy();
		});
		game.physics.arcade.overlap(player, obj['card_g'], (pl, card) => {
			/* TODO add animations */
			obj['door_g'].forEach((door) => { door.play('open'); });
			card.destroy();
		});
		game.physics.arcade.overlap(player, obj['card_b'], (pl, card) => {
			/* TODO add animations */
			obj['door_b'].forEach((door) => { door.play('open'); });
			card.destroy();
		});
		game.physics.arcade.overlap(player, obj['spike_u'], die);
		game.physics.arcade.overlap(player, obj['spike_l'], die);
		game.physics.arcade.overlap(player, obj['spike_r'], die);
		game.physics.arcade.overlap(player, obj['gate']);
		game.physics.arcade.overlap(player, obj['anomaly'], (us, them) => {
			player.on_ladder[1] = true;
			if (!player.on_ladder[0] && player.on_ladder[1]
				&& !(cmd.hold === 'down')) {
				player.body.gravity.y = 0;
			}
		});
		if (player.on_ladder[0] && !player.on_ladder[1]) {
			player.body.gravity.y = GRAVITY;
			if (cmd.hold === 'down') cmd.hold = '';
		}
		
		if (!player.is_stopped && !player.is_climbing) {
			player.body.velocity.x = (player.direction < 0 ? -1 : 1)*SPEED;
		} else {
			player.body.velocity.x = 0;
		}

		if (cmd.hold === 'up' || player.is_climbing) {
			climb();
		}
	},
	render: () => {
		//game.debug.body(player);
		//obj.spike_u.forEach((sp) => {
			//game.debug.body(sp);
		//});
		//obj.spike_l.forEach((sp) => {
			//game.debug.body(sp);
		//});
	}
}

function climb() {
	let ps = [
		map.getTileWorldXY(player.body.x + player.body.halfWidth,
			player.body.y + player.body.halfHeight).index,
	];
	/* 3 for a ladder */
	if (!ps.includes(3)) {
		if (player.is_climbing) {
			player.body.gravity.y = GRAVITY;
			player.is_climbing = false;
		}
		return;
	}
	player.body.gravity.y = 0;
	player.body.velocity.y = -SPEED;
	player.is_climbing = true;
	holded_cmd = '';
}

function die() {
	/* TODO play animation */
	player.is_climbing = false;
	player.is_stopped = true;
	player.body.gravity.y = GRAVITY;
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	player.body.position.x = active_gate.body.position.x;
	player.body.position.y = active_gate.body.position.y;
}

function populate(map, layer) {
	/* set collidable tiles */
	map.setCollisionBetween(1,1);
	map.setCollisionBetween(5,6);
	map.setCollisionBetween(10,10);
	//map.setCollisionBetween(16,18);
	/* turn tiles into sprites */
	map.createFromTiles(2, 0, 'spike_u', layer, obj['spike_u']);
	map.createFromTiles(21, 0, 'spike_l', layer, obj['spike_l']);
	map.createFromTiles(22, 0, 'spike_r', layer, obj['spike_r']);
	map.createFromTiles(4, 0, 'gate', layer, obj['gate']);
	map.createFromTiles(13, 0, 'card_r', layer, obj['card_r']);
	map.createFromTiles(14, 0, 'card_g', layer, obj['card_g']);
	map.createFromTiles(15, 0, 'card_b', layer, obj['card_b']);
	map.createFromTiles(16, 0, 'door_r', layer, obj['door_r']);
	map.createFromTiles(17, 0, 'door_g', layer, obj['door_g']);
	map.createFromTiles(18, 0, 'door_b', layer, obj['door_b']);
	map.createFromTiles(19, 0, 'blank', layer, obj['anomaly']);
	map.createFromTiles(23, 0, 'blank', layer, obj['foe_brd']);
	map.createFromTiles(20, 0, 'foe', layer, obj['foe']);
	map.createFromTiles(24, 0, 'treasure', layer, obj['treasure']);
	/* add sprite animations */
	let anim_door = (sp) => {
		sp.animations.add('closed', [0], 30, true);
		sp.animations.add('open', [1,2,3,4,5,6,7], 30).onComplete
			.add(function () {
				this.animations.play('idle');
			}, sp);
		sp.animations.add('idle', [7], 30, true);
		sp.animations.play('closed');

		game.physics.arcade.enable(sp);
		sp.body.immovable = true;
	};
	let anim_card = (sp) => {
		sp.animations.add('idle', [0,1,2,3,4,3,2,1], 30, true);
		sp.animations.play('idle');
		game.physics.arcade.enable(sp);
	};
	let init_spike = (sp) => {
		game.physics.arcade.enable(sp);
		sp.body.setCircle(5, 2, 4);
	};
	obj['gate'].forEach((sp) => {
		sp.animations.add('inactive', [0], 30, true);
		sp.animations.add('activate', [0,1,2,3,4,5,6,7,6,5,4], 30).onComplete
			.add(function () {
				this.animations.play('active');
			}, sp);
		sp.animations.add('active', [5,4], 5, true);
		sp.animations.play('inactive');

		game.physics.arcade.enable(sp);
		sp.body.onOverlap = new Phaser.Signal();
		sp.body.onOverlap.add((us, them) => {
			if (them !== player) return;
			if (us.animations.currentAnim.name !== 'inactive') return;
			active_gate = us;
			/* deactivate all the other gates */
			obj['gate'].forEach((s, me) => {
				if (s === me) return;
				s.play('inactive');
			}, false, us);
			us.play('activate');
			/* TODO add a particle effect */
		});
	}, this);
	obj['treasure'].forEach((sp) => {
		sp.animations.add('idle', [0,0,0,0,0,0,1], 5, true);
		sp.animations.play('idle');
		game.physics.arcade.enable(sp);
	}, this);
	obj['door_r'].forEach(anim_door, this);
	obj['door_g'].forEach(anim_door, this);
	obj['door_b'].forEach(anim_door, this);
	obj['card_r'].forEach(anim_card, this);
	obj['card_g'].forEach(anim_card, this);
	obj['card_b'].forEach(anim_card, this);
	obj['anomaly'].forEach((sp) => {
		game.physics.arcade.enable(sp);
	}, this);
	obj['spike_u'].forEach(init_spike, this);
	obj['spike_l'].forEach(init_spike, this);
	obj['spike_r'].forEach((sp) => {
		game.physics.arcade.enable(sp);
		sp.body.setCircle(5, 0, 2);
	}, this);
	obj['foe'].forEach((sp) => {
		game.physics.arcade.enable(sp);
		sp.body.immovable = true;
		sp.body.fixedRotation = true;
		sp.body.velocity.x = SPEED/4;
	}, this);
	obj['foe_brd'].forEach((sp) => {
		game.physics.arcade.enable(sp);
		sp.body.setSize(2, 16, 7, 0);
	}, this);
}
