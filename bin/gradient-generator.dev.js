!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.GradientGenerator=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Gradient = require('./gradient.js');

function createGradient(stops) {
    if (stops.length < 2) {
        throw 'At least 2 colors are needed to create a gradient.';
    }

    return new Gradient(stops);
}

module.exports = {
    createGradient: createGradient
};

},{"./gradient.js":2}],2:[function(require,module,exports){
function Gradient(stops) {
    this._width = 8192;
    this._init(stops);
}

Gradient.prototype.getColorBytesAt = function (value) {
    var base = Math.floor(value * (this._width - 1)) * 4;

    return {
        r: this._pixels[base],
        g: this._pixels[base + 1],
        b: this._pixels[base + 2],
        a: this._pixels[base + 3]
    };
};

Gradient.prototype.getColorAt = function (value) {
    var bytes = this.getColorBytesAt(value);

    return {
        r: bytes.r / 255,
        g: bytes.g / 255,
        b: bytes.b / 255,
        a: bytes.a / 255
    };
};

Gradient.prototype.getColorHexAt = function (value) {
    var bytes = this.getColorBytesAt(value),
        r = bytes.r.toString(16),
        g = bytes.g.toString(16),
        b = bytes.b.toString(16);

    r = r.length == 1 ? '0' + r : r;
    g = g.length == 1 ? '0' + g : g;
    b = b.length == 1 ? '0' + b : b;

    return '#' + r + g + b;
};

Gradient.prototype._init = function (stops) {
    var defaultStep = 1 / (stops.length - 1),
        canvas = document.createElement('canvas'),
        ctx,
        grd,
        parts,
        i;

    canvas.setAttribute('width', this._width);
    canvas.setAttribute('height', 1);
    ctx = canvas.getContext('2d');
    grd = ctx.createLinearGradient(0, 0, this._width, 1);

    for (i = 0; i < stops.length; ++i) {
        parts = stops[i].split(':');
        parts[1] = parts[1] ? parts[1] : i * defaultStep;
        grd.addColorStop(parseFloat(parts[1]), parts[0]);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this._width, 1);
    this._pixels = ctx.getImageData(0, 0, this._width, 1).data;
};

module.exports = Gradient;

},{}]},{},[1])(1)
});