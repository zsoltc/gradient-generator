import Gradient from './Gradient.js';

function createGradient(stops) {
  if (!stops || stops.length < 2) {
    throw 'At least 2 colors are needed to create a gradient.';
  }

  return new Gradient(stops);
}

export { createGradient };
