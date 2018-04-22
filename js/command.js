class CMD 
{
    constructor () {
		this._regex = /^[a-zA-Z0-9]$/;
        this._cmd = '';
		this._arg = '';
		/* writes to arg when true */
		this._put_arg = false;
        this._limit = 36;
        this._fs = {};
		/* list of parametrised commands */
		this._pd = [];
    }

	/* adds an action for a word */
    add(key, f, param_required) {
		this._fs[key] = f;
		if (param_required) {
			this._pd.push(key);
		}
    }

    clear() {
        this._cmd = '';
		this._arg = '';
		this._put_arg = false;
    }

    exec(strict) {
		if (!this._fs[this._cmd]) {
			this.clear();
			return false;
		}
		if (this._put_arg) {
			this._fs[this._cmd](this._arg);
			this.clear();
			return true;
		}
		let pd = this._pd.includes(this._cmd);
		if (pd && strict) return false;
		if (pd) {
			this._put_arg = true;
			return true;
		} 
		this._fs[this._cmd]();
		this.clear();
		return true;
    }

    backspace() {
		if (this._put_arg) {
			if (this._arg.length === 0) {
				this._put_arg = false;
				return;
			}
			this._arg = _.initial(this._arg).join('');
		}
		this._cmd = _.initial(this._cmd).join('');
    }

	get line() {
		return this._put_arg ? `${this._cmd} ${this._arg}` : `${this._cmd}`;
	}

    push(ch) {
		if (this.line.length + ch.length >= this._limit) return false;
		if (!this._regex.test(ch)) return false;
		if (this._put_arg) {
			this._arg = this._arg.concat(ch);
		} else {
			this._cmd = this._cmd.concat(ch);
		}
		return true;
    }
}
