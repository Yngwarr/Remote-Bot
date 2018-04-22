function init_input(game, cmd, player) {
    // init callbacks
    // all keys in command.js
    cmd.add('jump', ()=>{
        player.body.moveUp(200);
        if (!player.is_stopped) {
            if (player.direction < 0) {
                player.body.velocity.x += 50;
			} else {
                player.body.velocity.x -= 50;
			}
        }
    });

    cmd.add('turn', ()=>{
        player.direction *= -1;
        if (!player.is_stopped) {
			if (player.direction < 0) {
				player.body.moveLeft(100);
			} else {
				player.body.moveRight(100);
			}
		}
    });

    cmd.add('stop', ()=>{
        player.body.velocity.x = 0;
        player.is_stopped = true;
    });

    cmd.add('run', ()=>{
        player.body.moveRight(100);
        player.is_stopped = false;
    });

    cmd.add('use', ()=>{
		/* TODO */
	});
	cmd.add('do', (arg) => {
		console.log(`doing ${arg}`);
	}, true);
    
    // input commands
    game.input.keyboard.onPressCallback = e => {
        cmd.push(e);
        command_label.text = cmd.line;
    }
    // delete command
    game.input.keyboard.onDownCallback = e => {
        // if space then activate
        if (e.code == 'Space') {
			cmd.exec();
        }
		if (e.code == 'Enter') {
			cmd.exec(true);
		}
        if (e.code == 'Backspace') {
            cmd.backspace();
        }
        if (e.code == 'ArrowUp') {
			/* TODO */
        }
        command_label.text = cmd.line;
    }
}
