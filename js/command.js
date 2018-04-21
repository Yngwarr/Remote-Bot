let commands = {
    'move': [
        'run',
        'stop',
        'turn',
        'jump'
    ],
    'targets': [
        'leg',
        'head',
        'body'
    ],
    'activities': [
        'use',
        'kick',
        'punch'
    ]
};


class CMD 
{
    constructor () {
        this._regex = /^[a-zA-Z]+$/;
        this._command = '';
        this._cmd_len_limit = 36;
        this._callbacks = {};
    }

    add_callback(key, clb) {
        if (this._check_command(key)) {
            this._callbacks[key] = clb;
            return true;
        } 
        return false;
    }

    clear() {
        this._command = '';
    }

    execute() {
        if (!this.check_command())
            return false;

        for(let key in this._callbacks) {
            if (key == this._command) {
                this._callbacks[this._command]();
                return true;
            }
        }

        return false;
    }

    remove_last() {
        if (this._command.length == 0) return false;
        this._command = this._command.substr(0, this._command.length - 1);
        return true;
    }

    check_command() {
        return this._check_command(this._command);
    }

    _check_command(cmd) {
        for(let key in commands) {
            if(commands[key].includes(cmd)) {
                return true;
            }
        }
        return false;
    }

    // if command exist return a command else return an empty string
    get_command() {
        return this._command;
    }


    set_command(cmd) {
        try {
        if (typeof(cmd) != 'string')
            throw new Error(`incorrect command value:type ${cmd} : ${typeof(cmd)}`);
        let new_cmd = cmd.toLowerCase();
        if (this._regex.test(cmd))
            this._command = cmd;
        else
            throw new Error(`incorrect command value = ${cmd}`);
        } catch(e) {
            console.warn(e.message);
            return false;
        }
        return true;
    }

    add_symbol(symbol) {
        if (this._command.length >= this._cmd_len_limit)
            console.log(`command full, you must delete it or execute`);
        try {
            if (typeof(symbol) != 'string')
                throw new Error(`incorrect symbol value:type ${symbol} : ${typeof(symbol)}`);
            let new_symbol = symbol.toLowerCase()[0];
            
            let new_cmd = `${this._command}${new_symbol}`;

            if (!this._regex.test(new_cmd))
                throw new Error(`incorrect symbol ${new_symbol}`);
            else
                this._command += new_symbol;

        } catch(e) {
            console.warn(e.message);
            return false;
        }
        return true;
    }
}