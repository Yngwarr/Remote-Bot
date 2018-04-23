function init_input(game, cmd, player) {
    cmd.add('jump', () => {
		if (player.body.velocity.y !== 0) return;
		player.body.velocity.y = -JUMP_HEIGHT;
    });
    cmd.add('turn', () => {
        player.direction *= -1;
    });
    cmd.add('stop', () => {
        player.is_stopped = true;
    });
    cmd.add('run', () => {
        player.is_stopped = false;
		if (player.is_climbing) {
			player.is_climbing = false;
			player.body.gravity.y = GRAVITY;
		}
    });
	cmd.add('up', () => {
		cmd.hold = 'up';
	}, false, true);
	cmd.add('down', () => {
		cmd.hold = 'down';
	}, false, true);
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
			cmd.exec() || grad.play('blink');
        }
		if (e.code == 'Enter') {
			cmd.exec(true) || grad.play('blink');
		}
        if (e.code == 'Backspace') {
            cmd.backspace();
        }
        if (e.code == 'ArrowUp') {
			cmd.hist_scroll();
        }
        if (e.code == 'ArrowDown') {
			cmd.hist_scroll(true);
        }
        command_label.text = cmd.line;
    }
}
