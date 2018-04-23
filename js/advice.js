class Advice {
	constructor() {
		this.div = document.getElementById('advice');
		/* TODO use palette, luke! */
		this.colors = ['#f7e26b', '#eb8931', '#e06f8b', '#9d9d9d', '#44891a',
			'#31a2f2'];
		this.tips = [
			'`stop` command may be useful.',
			'You can execute `up` beforehand, it will work when is needed.',
			'Use command history with ↑ and ↓.',
			'`turn` command also works in the air.',
			'Icons on the left bottom corner may save your time.'
		];
		this.order = [];
	}
	show(msg) {
		let color = _.sample(this.colors);
		this.div.innerHTML = msg;
		this.div.style.color = color;
		this.div.style.borderColor = color;
		this.div.classList.remove('folded');
		game.time.events.add(5000, function () {
			this.div.classList.add('folded');
		}, this);
	}
	tip() {
		if (this.order.length === 0) {
			this.order = _.shuffle(_.range(this.tips.length));
		}
		this.show(this.tips[_.last(this.order)]);
		this.order.pop();
	}
	help() {
	}
}
