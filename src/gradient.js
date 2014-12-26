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
