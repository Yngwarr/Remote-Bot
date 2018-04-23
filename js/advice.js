class Advice {
	constructor() {
		this.div = document.getElementById('advice');
		this.hdiv = document.getElementById('help');
		/* TODO use palette, luke! */
		this.colors = ['#f7e26b', '#eb8931', '#e06f8b', '#9d9d9d', '#a3ce27',
			'#31a2f2'];
		this.tips = [
			'`stop` command may be useful.',
			'You can execute `up` beforehand, it will work when is needed.',
			'Use ↑ and ↓ to access command history.',
			'`turn` command also works in the air.',
			'Icons on the left bottom corner may save your time.',
			'Any command cancels `up` and `down`.'
		];
		this.order = [];
		this.cutscene = true;
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
		this.hdiv.classList.remove('folded');
	}
	hide_help() {
		this.hdiv.classList.add('folded');
	}
	cut_run() {
		let pre = document.querySelector('#cutscene pre');
		let command = '$ ssh remote_bot@hardweird -p 1337';
		let idx = 1;
		let timeout;
		let greet = () => {
			pre.innerHTML +=
'\n' +
' ____                      _         ____        _   \n' +
'|  _ \\ ___ _ __ ___   ___ | |_ ___  | __ )  ___ | |_ \n' +
'| |_) / _ \\ \'_ ` _ \\ / _ \\| __/ _ \\ |  _ \\ / _ \\| __|\n' +
'|  _ <  __/ | | | | | (_) | ||  __/ | |_) | (_) | |_ \n' +
'|_| \\_\\___|_| |_| |_|\\___/ \\__\\___| |____/ \\___/ \\__|\n' +
'                                                     \n' +
'Connecting to the environment'
;
			clearTimeout(timeout);
			let count = 3;
			let dots = setInterval(() => {
				if (count <= 0) {
					clearInterval(dots);
					adv.cut_end();
					return;
				}
				count--;
				pre.innerHTML += '.';
			}, 1000)
		};
		let timer = setInterval(() => {
			if (idx >= command.length) {
				clearInterval(timer);
				timeout = setTimeout(greet, 1000);
			}
			idx++;
			pre.innerHTML = command.substring(0, idx);
		}, 100);
	}
	cut_end() {
		document.getElementById('cutscene').classList.add('folded');
		this.cutscene = false;
		this.help();
	}
}
