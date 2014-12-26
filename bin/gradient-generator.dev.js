!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.GradientGenerator=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Gradient = require('./gradient.js');

function createGradient(colorStops) {
    var stopsArray = colorStops.split(' '),
        defaultStep = 1 / (stopsArray.length - 1),
        stops = [],
        parts,
        i;

    if (stopsArray.length < 2) {
        throw 'At least 2 colors are needed to create a gradient.';
    }

    for (i = 0; i < stopsArray.length; ++i) {
        parts = stopsArray[i].split(':');
        parts[1] = parts[1] ? parts[1] : i * defaultStep;

        stops.push({
            r: parseInt(parts[0].substring(1, 3), 16) / 255,
            g: parseInt(parts[0].substring(3, 5), 16) / 255,
            b: parseInt(parts[0].substring(5, 7), 16) / 255,
            stopValue: parseFloat(parts[1])
        });
    }

    return new Gradient(stops);
}

module.exports = {
    createGradient: createGradient
};

},{"./gradient.js":2}],2:[function(require,module,exports){
function Gradient(stops) {
    this.stops = stops;
}

Gradient.prototype.getColorAt = function (value) {
    var stops = this.stops,
        i;

    for (i = 1; i < stops.length; ++i) {
        if (value <= stops[i].stopValue) {
            break;
        }
    }

    value = (value - stops[i - 1].stopValue) / (stops[i].stopValue - stops[i - 1].stopValue);

    return {
        r: lerp(stops[i - 1].r, stops[i].r, value),
        g: lerp(stops[i - 1].g, stops[i].g, value),
        b: lerp(stops[i - 1].b, stops[i].b, value)
    };
};

Gradient.prototype.getColorBytesAt = function (value) {
    var color = this.getColorAt(value);

    return {
        r: Math.round(color.r * 255),
        g: Math.round(color.g * 255),
        b: Math.round(color.b * 255)
    };
};

Gradient.prototype.getColorHexAt = function (value) {
    var color = this.getColorBytesAt(value),
        r = color.r.toString(16),
        g = color.g.toString(16),
        b = color.b.toString(16);

    r = r.length == 1 ? '0' + r : r;
    g = g.length == 1 ? '0' + g : g;
    b = b.length == 1 ? '0' + b : b;

    return '#' + r + g + b;
};

function lerp(a, b, t) {
    return a + t * (b - a);
}

module.exports = Gradient;

},{}]},{},[1])(1)
});