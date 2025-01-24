export class Drawer {
    constructor(width, height, scale = 10) {
        this.scale = scale;
        const canvas = document.createElement('canvas');
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        this.ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawRectangle(x, y, color, size = 1) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        const width = size * this.scale;
        this.ctx.fillRect(x * this.scale + ((this.scale - width) / 2), y * this.scale + ((this.scale - width) / 2), width, width);
    }
    drawCircle(x, y, color, strokeColor, size = 1) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.arc(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, (size * this.scale) / 2.5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
    drawDiamond(x, y, color, size = 1) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        const halfSize = (size * this.scale) / 2;
        const topX = x * this.scale + this.scale / 2;
        const topY = y * this.scale;
        const rightX = x * this.scale + this.scale;
        const rightY = y * this.scale + halfSize;
        const bottomX = x * this.scale + this.scale / 2;
        const bottomY = y * this.scale + this.scale;
        const leftX = x * this.scale;
        const leftY = y * this.scale + halfSize;
        this.ctx.moveTo(topX, topY);
        this.ctx.lineTo(rightX, rightY);
        this.ctx.lineTo(bottomX, bottomY);
        this.ctx.lineTo(leftX, leftY);
        this.ctx.closePath();
        this.ctx.fill();
    }
}
