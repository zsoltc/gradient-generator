(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GradientGenerator"] = factory();
	else
		root["GradientGenerator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createGradient = undefined;

	var _gradient = __webpack_require__(1);

	var _gradient2 = _interopRequireDefault(_gradient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createGradient(stops) {
	  if (stops.length < 2) {
	    throw 'At least 2 colors are needed to create a gradient.';
	  }

	  return new _gradient2.default(stops);
	}

	exports.createGradient = createGradient;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Gradient = function () {
	  function Gradient(stops) {
	    _classCallCheck(this, Gradient);

	    this._width = 8192;
	    this._init(stops);
	  }

	  _createClass(Gradient, [{
	    key: 'getColorBytesAt',
	    value: function getColorBytesAt(value) {
	      var base = Math.floor(value * (this._width - 1)) * 4;

	      return {
	        r: this._pixels[base],
	        g: this._pixels[base + 1],
	        b: this._pixels[base + 2],
	        a: this._pixels[base + 3]
	      };
	    }
	  }, {
	    key: 'getColorAt',
	    value: function getColorAt(value) {
	      var bytes = this.getColorBytesAt(value);

	      return {
	        r: bytes.r / 255,
	        g: bytes.g / 255,
	        b: bytes.b / 255,
	        a: bytes.a / 255
	      };
	    }
	  }, {
	    key: 'getColorHexAt',
	    value: function getColorHexAt(value) {
	      var bytes = this.getColorBytesAt(value);
	      var r = bytes.r.toString(16);
	      var g = bytes.g.toString(16);
	      var b = bytes.b.toString(16);

	      r = r.length == 1 ? '0' + r : r;
	      g = g.length == 1 ? '0' + g : g;
	      b = b.length == 1 ? '0' + b : b;

	      return '#' + r + g + b;
	    }
	  }, {
	    key: 'getColorRGBAStringAt',
	    value: function getColorRGBAStringAt(value) {
	      var bytes = this.getColorBytesAt(value);

	      return 'rgba(' + bytes.r + ',' + bytes.g + ',' + bytes.b + ',' + bytes.a / 255 + ')';
	    }
	  }, {
	    key: '_init',
	    value: function _init(stops) {
	      var defaultStep = 1 / (stops.length - 1);
	      var canvas = document.createElement('canvas');

	      canvas.setAttribute('width', this._width);
	      canvas.setAttribute('height', 1);
	      var ctx = canvas.getContext('2d');
	      var grd = ctx.createLinearGradient(0, 0, this._width, 1);

	      for (var i = 0; i < stops.length; ++i) {
	        var parts = stops[i].split(':');
	        parts[1] = parts[1] ? parts[1] : i * defaultStep;
	        grd.addColorStop(parseFloat(parts[1]), parts[0]);
	      }

	      ctx.fillStyle = grd;
	      ctx.fillRect(0, 0, this._width, 1);
	      this._pixels = ctx.getImageData(0, 0, this._width, 1).data;
	    }
	  }]);

	  return Gradient;
	}();

	exports.default = Gradient;

/***/ }
/******/ ])
});
;