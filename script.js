
class Stoper extends React.Component {

	constructor() {
		super();
		this.reset(); //wywolanie tego reset
		this.state = { //deklaracja podstawowych danych
			running: false,
			display: document.querySelector('.stopwatch'),
			currentTime: this.format(this.times)
		};
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnClickstop = this.handleOnClickstop.bind(this);
	}

	print() {
		document.querySelector('.stopwatch').innerText = this.format(this.times);
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	start() {		
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	handleOnClick(e) {
		e.preventDefault();
		console.log('click');
		this.start();
	}

	handleOnClickstop(e) {
		e.preventDefault();
		console.log('click');
		this.stop();
 	}

	render() {
		return (
			<div>
				<nav className={'controls'}>
					<a href='#' className={'button'} id='start' onClick={this.handleOnClick}>Start</a>
					<a href="#" className={'button'} id='stop' onClick={this.handleOnClickstop}>Stop</a>
				</nav>
				<div className={'stopwatch'}>{this.state.currentTime}</div>
			</div>
		)
	}
}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var app = React.createElement(Stoper);
ReactDOM.render(app, document.getElementById('app'));