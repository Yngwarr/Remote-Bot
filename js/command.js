let commands = {
    'move': [
        'run',
        'stay',
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
        this._regex = /^[a-zA-Z]{1,15}$/;
        this._command = '';
    }

    clear() {
        this._command = '';
    }

    // if command exist return a command else return an empty string
    get command() {
        for(let key in commands) {
            if(commands[key].includes(this._command)) {
                return this._command;
            }
        }
        if (this._command.length != 0 ) {
            console.warn(`bad command ${this._command}`);
            this.clear();
        }
        return this._command;
    }

    set command(cmd) {
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
        }
    }

    add_symbol(symbol) {
        try {
            if (typeof(symbol) != 'string')
                throw new Error(`incorrect symbol value:type ${symbol} : ${typeof(symbol)}`);
            let new_symbol = symbol.toLowerCase();
            if (new_symbol.length != 1)
                throw new Error('input value\'s length must be equal 1');
            let new_cmd = `${this._command}${new_symbol}`;
            if (!this._regex.test(new_symbol))
                throw new Error(`incorrect symbol ${new_symbol}`);
            else
                this._command += new_symbol;
        } catch(e) {
            console.warn(e.message);
        }
    }
}