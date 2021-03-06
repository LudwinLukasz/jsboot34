'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stoper = function (_React$Component) {
	_inherits(Stoper, _React$Component);

	function Stoper() {
		_classCallCheck(this, Stoper);

		var _this = _possibleConstructorReturn(this, (Stoper.__proto__ || Object.getPrototypeOf(Stoper)).call(this));

		_this.reset(); //wywolanie tego reset
		_this.state = { //deklaracja podstawowych danych
			running: false,
			display: document.querySelector('.stopwatch'),
			currentTime: _this.format(_this.times)
		};
		_this.handleOnClick = _this.handleOnClick.bind(_this);
		_this.handleOnClickstop = _this.handleOnClickstop.bind(_this);
		return _this;
	}

	_createClass(Stoper, [{
		key: 'print',
		value: function print() {
			document.querySelector('.stopwatch').innerText = this.format(this.times);
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}
	}, {
		key: 'format',
		value: function format(times) {
			return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) return;
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
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
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'handleOnClick',
		value: function handleOnClick(e) {
			e.preventDefault();
			console.log('click');
			this.start();
		}
	}, {
		key: 'handleOnClickstop',
		value: function handleOnClickstop(e) {
			e.preventDefault();
			console.log('click');
			this.stop();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'start', onClick: this.handleOnClick },
						'Start'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'stop', onClick: this.handleOnClickstop },
						'Stop'
					)
				),
				React.createElement(
					'div',
					{ className: 'stopwatch' },
					this.state.currentTime
				)
			);
		}
	}]);

	return Stoper;
}(React.Component);

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var app = React.createElement(Stoper);
ReactDOM.render(app, document.getElementById('app'));
