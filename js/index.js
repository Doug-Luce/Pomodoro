var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.stopTimer = function (timer) {
      clearInterval(timer);
      timer = null;
    };

    _this.handleStart = function () {
      if (!_this.pomodoroStarted) {
        _this.timer = setInterval(function () {
          _this.setState({ time: _this.state.time - 1 });
        }, 1000);
        _this.pomodoroStarted = !_this.pomodoroStarted;
      }

      if (!_this.time) {
        _this.time = _this.state.time;
        _this.breakTime = _this.state.breakTime;
      }
    };

    _this.handlePause = function () {
      if (_this.pomodoroStarted) {
        _this.isPaused = true;
        _this.setState(_this.state);
        if (!_this.breakStarted) {
          _this.stopTimer(_this.timer);
        }

        if (_this.breakStarted) {
          _this.stopTimer(_this.breakTimer);
        }
      }
    };

    _this.handleResume = function () {
      if (_this.pomodoroStarted) {
        _this.setState(_this.state);
        _this.isPaused = false;

        if (!_this.breakStarted) {
          _this.timer = setInterval(function () {
            _this.setState({ time: _this.state.time - 1 });
          }, 1000);
        }

        if (_this.breakStarted) {
          _this.breakTimer = setInterval(function () {
            _this.setState({ breakTime: _this.state.breakTime - 1 });
          }, 1000);
        }
      }
    };

    _this.handleReset = function () {
      _this.setState({
        time: 1500,
        breakTime: 300
      });
      _this.stopTimer(_this.timer);
      _this.pomodoroStarted = false;
      _this.stopTimer(_this.breakTimer);
      _this.breakStarted = false;
      _this.isPaused = false;
    };

    _this.calculateTime = function (time) {
      return Math.floor(time / 60) + ":" + (time % 60 > 9 ? "" + time % 60 : "0" + time % 60);
    };

    _this.increaseTime = function () {
      if (!_this.pomodoroStarted) {
        _this.setState({ time: _this.state.time + 60 });
      }
    };

    _this.increaseBreakTime = function () {
      if (!_this.pomodoroStarted) {
        _this.breakTime = _this.breakTime + 60;
        _this.setState({ breakTime: _this.state.breakTime + 60 });
      }
    };

    _this.decreaseTime = function () {
      if (_this.state.time > 60 && !_this.pomodoroStarted) {
        _this.setState({ time: _this.state.time - 60 });
      }
    };

    _this.decreaseBreakTime = function () {
      if (_this.breakTime > 60) {
        _this.breakTime = _this.breakTime - 60;
      }
      if (_this.state.breakTime > 60 && !_this.pomodoroStarted) {
        _this.setState({ breakTime: _this.state.breakTime - 60 });
      }
    };

    _this.state = {
      time: 1500,
      breakTime: 300
    };
    _this.breakTime = 300;
    _this.pomodoroStarted = false;
    _this.breakStarted = false;
    _this.isPaused = false;
    _this.dev = false;
    _this.audio = new Audio('https://res.cloudinary.com/lucedesign/video/upload/v1494560703/8bit-laser_z04j15.wav');
    return _this;
  }

  _createClass(App, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.time < 1) {
        this.audio.play();
        var audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/branch_break.mp3');
        audio.play();
        this.stopTimer(this.timer);
        //After the Pomodoro timer ends, set the time to the stored value set by the user
        this.setState({ time: this.time });
        if (!this.breakStarted) {
          this.startBreak();
          this.breakStarted = true;
        }
      }

      if (this.state.breakTime < 1) {
        this.audio.play();
        this.stopTimer(this.breakTimer);
        //After the break timer ends, set the time to the stored value set by the user
        this.setState({ breakTime: this.breakTime });
        this.pomodoroStarted = false;
        this.breakStarted = false;
        this.handleStart();
      }
    }
  }, {
    key: "startBreak",
    value: function startBreak() {
      var _this2 = this;

      this.breakTimer = setInterval(function () {
        _this2.setState({ breakTime: _this2.state.breakTime - 1 });
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "title" },
          "Pomodoro Clock"
        ),
        React.createElement(
          "div",
          { className: "pomodoro" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this.increaseTime },
              "+"
            )
          ),
          React.createElement(
            "div",
            { className: "timer" },
            this.breakStarted ? this.calculateTime(this.state.breakTime) : this.calculateTime(this.state.time)
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this.decreaseTime },
              "-"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "start-pause" },
            React.createElement(
              "button",
              { onClick: this.handleStart },
              "Start"
            ),
            React.createElement(
              "button",
              {
                onClick: this.isPaused ? this.handleResume : this.handlePause
              },
              this.isPaused ? "Resume" : "Pause"
            )
          ),
          React.createElement(
            "div",
            { className: "contain-it" },
            React.createElement(
              "div",
              { className: "reset" },
              React.createElement(
                "button",
                { onClick: this.handleReset },
                "Reset"
              )
            ),
            React.createElement(
              "div",
              { className: "break-length" },
              React.createElement(
                "div",
                { className: "break-time" },
                React.createElement(
                  "button",
                  { onClick: this.increaseBreakTime },
                  "+"
                ),
                React.createElement(
                  "div",
                  { className: "break-text" },
                  this.calculateTime(this.breakTime)
                ),
                React.createElement(
                  "button",
                  { onClick: this.decreaseBreakTime },
                  "-"
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          null,
          this.dev ? React.createElement(
            "table",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                "State"
              ),
              React.createElement(
                "th",
                null,
                "Value"
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "this.state.time:"
              ),
              React.createElement(
                "td",
                null,
                this.state.time
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "this.state.breakTime:"
              ),
              React.createElement(
                "td",
                null,
                this.state.breakTime
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "This.time:"
              ),
              React.createElement(
                "td",
                null,
                this.time
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "This.breakTime:"
              ),
              React.createElement(
                "td",
                null,
                this.breakTime
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "This.pomodoroStarted:"
              ),
              React.createElement(
                "td",
                null,
                this.pomodoroStarted.toString()
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "breakStarted:"
              ),
              React.createElement(
                "td",
                null,
                this.breakStarted.toString()
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "isPaused:"
              ),
              React.createElement(
                "td",
                null,
                this.isPaused.toString()
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "This.timer:"
              ),
              React.createElement(
                "td",
                null,
                this.timer
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "This.breakTimer:"
              ),
              React.createElement(
                "td",
                null,
                this.breakTimer
              )
            )
          ) : ""
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));