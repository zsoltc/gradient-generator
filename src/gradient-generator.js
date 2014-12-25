function createGradient(colorStops) {
    return new Gradient(colorStops);
}

function Gradient() {
}

Gradient.prototype.getColorAt = function (value) {
    return {
        r: value,
        g: value,
        b: value
    };
};

function lerp(a, b, t) {
    return a + t * (b - a);
}

module.exports = {
    createGradient: createGradient
};
