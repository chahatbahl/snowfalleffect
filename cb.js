(function() {
  "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.animation_config = { generatorDelay: { min: 1, max: 50 }, speed: .5, x_axis_rate: .1, weight: .5, size: .5, z_axis_rate: .05, color: { b: 255, a: .8 }, wind: 0 }, function () {
  window.animation_config = window.animation_config || { generatorDelay: { min: 1, max: 20 }, isRunning: !0, speed: 1, x_axis_rate: .1, weight: .5, size: 1.5, z_axis_rate: .05, color: { b: 255, a: .8 }, wind: 0 }, window.animation_config.isRunning = !0;var i = document.createElement("canvas");i.id = "cb-snow-flake", document.body.appendChild(i);var n = i.getContext("2d");i.width = window.innerWidth, i.height = window.innerHeight, i.style.position = "fixed", i.style.top = 0, i.style.left = 0, i.style.right = 0, i.style.bottom = 0, i.style.pointerEvents = "none", i.style.zIndex = 1e3;var t = { lower: 0, upper: i.width },
      o = [];function e() {
    var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    return Math.floor(Math.random() * (n - i + 1) + i);
  }function a() {
    var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    return Math.random() * (n - i) + i;
  }
  var s = function () {
    function s(i, n, t, o, e, a) {
      _classCallCheck(this, s);

      this.pos = i, this.vector = n, this.z_index = t % 5, this.color = e, this.size = o % 50, this.weight = a % 50;
    }

    _createClass(s, [{
      key: "draw",
      value: function draw() {
        !this.death && this.pos.x >= 0 && this.pos.x <= i.width && (n.beginPath(), n.arc(this.pos.x, this.pos.y, this.displaySize, 0, 2 * Math.PI), n.fillStyle = this.color, n.fill());
      }
    }, {
      key: "update",
      value: function update() {
        this.vector.z += a(-.1, .1), this.z_index += this.vector.z * window.animation_config.z_axis_rate, this.z_index <= 0 && (this.z_index = Math.abs(this.z_index)), this.pos.y > i.height - this.displaySize || !(this.pos.x >= t.lower && this.pos.x <= t.upper) || this.displaySize <= 0 ? this.death = !0 : (this.vector.x += a(-.3, .3) * this.z_index * window.animation_config.x_axis_rate, this.vector.y = Math.sqrt(this.weight * this.size * this.z_index) * window.animation_config.speed, this.pos.x += this.vector.x + window.animation_config.wind, this.pos.y += this.vector.y);
      }
    }, {
      key: "displaySize",
      get: function get() {
        return Math.sqrt(this.z_index * this.size) * window.animation_config.size;
      }
    }]);

    return s;
  }();

  o = [], function n() {
    if (window.animation_config.isRunning) {
      window.animation_config.wind > 0 ? (t.lower = 200 * window.animation_config.wind * -1, t.upper = i.width) : window.animation_config.wind < 0 && (t.lower = 0, t.upper = i.width + -200 * window.animation_config.wind);var h = { x: e(t.lower, t.upper), y: 0 },
          w = { x: a(-.3, .3), y: a(-5, 5), z: a(-.1, .1) },
          r = a(.1, 5),
          d = a(.2, 5),
          c = (l = window.animation_config.color.b, _ = window.animation_config.color.a, "rgba(" + e(l, 255) + "," + e(l, 255) + "," + e(l, 255) + "," + _ + ")"),
          g = window.animation_config.weight;o.push(new s(h, w, d, r, c, g));
    }var l, _;setTimeout(n, e(window.animation_config.generatorDelay.min, window.animation_config.generatorDelay.max));
  }(), function t() {
    if (window.animation_config.isRunning) {
      n.clearRect(0, 0, i.width, i.height), o = o.filter(function (i) {
        return !i.death;
      });for (var e = 0; e < o.length; e++) {
        o[e].update(), o[e].draw();
      }
    }requestAnimationFrame(t);
  }();
}();
})();
