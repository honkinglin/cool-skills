var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function () {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

// 绘制o形元素
presets.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function (ctx, t) {
            this.x += this.dx;
            this.y += this.dy;

            ctx.beginPath();
            // 将时间戳t传入进来不断增加来动态改变o形的偏移，配合Math.sin函数形成一个0-1的偏移量倍数使得图形上下左右来回绘制
            ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + +Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
};

// 绘制x形元素
presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function (ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;

            var _this = this;
            var line = function (x, y, tx, ty, c) {
                ctx.beginPath();
                ctx.moveTo((_this.s / 2) * x, (_this.s / 2) * y);
                ctx.lineTo((_this.s / 2) * tx, (_this.s / 2) * ty);
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };

            ctx.save();
            // 将时间戳t传入进来不断增加来动态改变x形的偏移，配合Math.sin函数形成一个0-1的偏移量倍数使得图形上下左右来回绘制
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180); // 旋转r度

            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');

            ctx.restore();
        }
    }
};

for (var x = 0; x < Canvas.width; x++) {
    for (var y = 0; y < Canvas.height; y++) {
        if (Math.round(Math.random() * 8000) === 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if (Math.round(Math.random()) === 1)
                elements.push(presets.o(x, y, s, 0, 0)); // 随机绘制o形元素
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360))); // 随机绘制x形元素
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements) {
        elements[e].draw(ctx, time);
    }

    window.requestAnimationFrame(animate);
}

animate();
