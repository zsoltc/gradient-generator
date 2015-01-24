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
