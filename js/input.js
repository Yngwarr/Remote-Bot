function init_input(game, cmd, player) {
    // init callbacks
    // all keys in command.js
    cmd.add_callback('jump', ()=>{
        //console.log('i am jumping');
        player.body.moveUp(200);
        if (!player.is_stopped) {
            if (player.cur_dirrection < 0)
                player.body.velocity.x += 50;
            else
                player.body.velocity.x -= 50;
        }
    });

    cmd.add_callback('turn', ()=>{
        //console.log('i am turning');
        player.cur_dirrection *= -1;
        if (!player.is_stopped) {
			if (player.cur_dirrection < 0)
				player.body.moveLeft(100);
			else
				player.body.moveRight(100);
		}
    });

    cmd.add_callback('stop', ()=>{
        //console.log('i am stopping');
        player.body.velocity.x = 0;
        player.is_stopped = true;
    });

    cmd.add_callback('run', ()=>{
        //console.log('i am running');
        player.body.moveRight(100);
        player.is_stopped = false;
    });

    cmd.add_callback('use', ()=>{
        //get_active object
        //object.execute any things
    });
    
    // input commands
    game.input.keyboard.onPressCallback = e => {
        // input command
        if (cmd.add_symbol(e)) {
            //console.log('success set command');
        } else {
            //console.log(`error add symbol, last key = ${e}`);
        }
        command_label.text = cmd.get_command();
    }
    // delete command
    game.input.keyboard.onDownCallback = e => {
        // if space then activate
        if (e.code == 'Space' || e.code == 'Enter') {
            if (cmd.check_command()) {
                if (!cmd.execute()) {}
                    //console.log('can\'t execute');
            } else {
                //console.log(`command = ${cmd.get_command()} isn't valid`);
            }
            if (last_commands.length > history_limit) {
                last_commands = last_commands.slice(last_commands.length - 8, last_commands.length);
                id_command = 0;
            } else
            if (last_commands[last_commands.length -1] != cmd.get_command() && cmd.check_command()) {
                last_commands.push(cmd.get_command());
                id_command = last_commands.length - 1;
            }
            cmd.clear();
        }
        if (e.code == 'Backspace') {
            cmd.remove_last();
            //console.log(`current command ${cmd.get_command()}`);
        }
        if (e.code == 'ArrowUp') {
            if (last_commands.length > 0) {
                id_command = id_command-1 < 0? last_commands.length-1 : id_command - 1 ;
                cmd.set_command(last_commands[id_command]);
            }
        }
        command_label.text = cmd.get_command();
    }
}
