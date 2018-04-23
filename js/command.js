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
		/* list of commands that keep a hold */
		this._keep = [];
		this._hist = [];
		this._hist_idx = 0;
		this._hist_limit = 8;
		this.hold = '';
    }

	/* adds an action for a word */
    add(key, f, param_required, keeps) {
		this._fs[key] = f;
		if (param_required) {
			this._pd.push(key);
		}
		if (keeps) {
			this._keep.push(key);
		}
    }

    clear() {
        this._cmd = '';
		this._arg = '';
		this._put_arg = false;
    }

    exec(strict) {
		if (adv.cutscene) {
			adv.cut_end();
			return false;
		}
		adv.hide_help();
		if (!this._fs[this._cmd]) {
			this.clear();
			return false;
		}
		if (this._put_arg) {
			this._fs[this._cmd](this._arg);
			this.hist_push();
			if (!this._keep.includes(this._cmd)) {
				this.hold = '';
			}
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
		this.hist_push();
		if (!this._keep.includes(this._cmd)) {
			this.hold = '';
		}
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
			return;
		}
		this._cmd = _.initial(this._cmd).join('');
    }

	get line() {
		return this._put_arg ? `${this._cmd} ${this._arg}` : `${this._cmd}`;
	}

	set line(str) {
		let [cmd, arg] = str.split(' ');
		this._cmd = cmd;
		if (arg) {
			this._arg = arg;
			this._put_arg = true;
		} else {
			this._arg = '';
		}
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

	hist_push() {
		this._hist = _.without(this._hist, this.line);
		if (this._hist.length >= this._hist_limit) {
			this._hist = _.rest(this.hist);
		}
		this._hist.push(this.line);
		this._hist_idx = this._hist.length;
	}

	hist_scroll(down) {
		if (this._hist_idx <= 0 && !down) return;
		this._hist_idx += down ? 1 : -1;
		if (this._hist_idx >= this._hist.length) {
			this.clear();
			this._hist_idx = this._hist.length;
			return;
		}
		this.line = this._hist[this._hist_idx];
	}
}
