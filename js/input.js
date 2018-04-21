
function init_input(game, cmd, player) {
    // init callbacks
    // all keys in command.js
    cmd.add_callback('jump', ()=>{
        console.log('i am jumping');
    });

    cmd.add_callback('turn', ()=>{
        console.log('i am turning');
    });

    cmd.add_callback('stay', ()=>{
        console.log('i am staying');
    });

    cmd.add_callback('run', ()=>{
        console.log('i am running');
    });
    
    // input commands
    game.input.keyboard.onPressCallback = e => {
        // if space then activate
        if (e == ' ') {
            if (cmd.check_command()) {
                if (!cmd.execute()) 
                    console.log('can\'t execute');
            } else {
                console.log(`command = ${cmd.get_command()} isn't valid`);
            }
            cmd.clear();
        }
        // input command
        if (cmd.add_symbol(e)) {
            console.log('success set command');
        } else {
            console.log(`error add symbol, last key = ${e}`);
        }
        console.log(`current command ${cmd.get_command()}`);
    }
    // delete command
    game.input.keyboard.onDownCallback = e => {
        if (e.code != 'Backspace') return;
        cmd.remove_last();
        console.log(`current command ${cmd.get_command()}`);
    }
}

