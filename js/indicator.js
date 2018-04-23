class Indicator {
	constructor() {
		this.font = {
			font: '8px IBM',
			//fill: '#31a2f2',
			fill: '#44891a',
		};
		this.idx_font = {
			font: '8px IBM',
			fill: '#a3ce27',
		};
		this._hold_l = game.add.text(8, game.height - 22, 'hold: ', this.font);
		this._dir_l = game.add.text(8, game.height - 12, 'dir:  ', this.font);
		this._hold = game.add.text(48, game.height - 22, ' ', this.idx_font);
		this._dir = game.add.text(48, game.height - 12, ' ', this.idx_font);
	}
	set hold(val) {
		if (val === 'down') {
			this._hold.text = '↓';
		} else if (val === 'up') {
			this._hold.text = '↑';
		} else {
			this._hold.text = ' ';
		}
	}
	set dir(val) {
		if (val === -1) {
			this._dir.text = '←';
		} else if (val === 1) {
			this._dir.text = '→';
		} else {
			this._dir.text = ' ';
		}
	}
}
