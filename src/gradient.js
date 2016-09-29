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

Gradient.prototype.getColorRGBAStringAt = function (value) {
    var bytes = this.getColorBytesAt(value);

    return 'rgba(' + bytes.r + ',' + bytes.g + ',' + bytes.b + ',' + (bytes.a / 255) + ')';
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

export default Gradient;
