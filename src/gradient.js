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
        r: color.r * 255,
        g: color.g * 255,
        b: color.b * 255
    };
};

function lerp(a, b, t) {
    return a + t * (b - a);
}

module.exports = Gradient;
