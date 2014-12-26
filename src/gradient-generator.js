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
