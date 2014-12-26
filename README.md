# gradient-generator

A small JavaScript library for creating smooth gradients.

## Getting Started
Download the [development version][max].

[max]: https://raw.githubusercontent.com/zsoltc/gradient-generator/master/bin/gradient-generator.dev.js

Example usage:

```html
<script src="gradient-generator.dev.js"></script>
<script>
// Creates a gradient with 4 color stops (black -> red -> yellow -> white).
// The gradient ranges from 0 to 1 (0: black, 0.33: red, 0.66: yellow, 1: white).
var gradient = GradientGenerator.createGradient('#000000 #c50106 #f5f100 #ffffff');

// Gets color at 0.4 (somewhere between red and yellow).
// RGB values are between 0 and 1.
var color = gradient.getColorAt(0.4);
console.log('red: ' + color.r + ' green: ' + color.g + ' blue: ' + color.b);

// Gets color in bytes.
// RGB values are between 0 and 255.
color = gradient.getColorBytesAt(0.4);
console.log('red: ' + color.r + ' green: ' + color.g + ' blue: ' + color.b);

// Gets color in hex.
color = gradient.getColorHexAt(0.4);
console.log(color);
</script>
```
