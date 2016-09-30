import { expect } from 'chai';
import { createGradient } from '../src/gradient-generator.js';

describe('gradient-generator', () => {
  describe('#createGradient()', () => {
    it('should throw error when not given enough parameters', () => {
      expect(() => createGradient()).to.throw('At least 2 colors are needed to create a gradient.');
    });
  });
});
