/**
 * Paint function
 *
 */

class PaintingCanvas {
  constructor(el) {
    this.enabled = true;
    this.canvas = el;
    this.mouseListener = el.parentNode;
    this.ctx = this.canvas.getContext('2d');
    this.lineWidth = this.canvas.getAttribute('data-width') || 20;
    this.strokeStyle = this.canvas.getAttribute('data-color') || '#000000';
    this.started = false;
    this.move_count = 0;
    this.lastx = 0;
    this.lasty = 0;
    this.memCanvas = document.createElement('canvas');
    this.width = this.canvas.width = this.memCanvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.memCanvas.height = this.canvas.offsetHeight;
    this.memCtx = this.memCanvas.getContext('2d');
    this.points = [];
    this.addListeners();
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('resizeel', () => this.resize());
    this.canvas.addEventListener('clearcanvas', (e) => this.toggle());
  }

  addListeners() {
    this.mouseListener.addEventListener('mouseenter', (e) => this.move(e));
    this.mouseListener.addEventListener('touchstart', (e) => this.move(e), { passive: true });
    this.mouseListener.addEventListener('mousemove', (e) => this.move(e));
    this.mouseListener.addEventListener('touchmove', (e) => this.move(e), { passive: true });
    this.mouseListener.addEventListener('wheel', (e) => this.move(e), { passive: true });
    this.mouseListener.addEventListener('mouseleave', (e) => this.end(e));
    this.mouseListener.addEventListener('touchend', (e) => this.end(e), { passive: true });
  }

  toggle() {
    if(this.enabled) {
      this.enabled = false;
      this.clear();
    } else {
      this.enabled = true;
    }
  }

  resize() {
    const imageData = this.memCtx.getImageData(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.width = this.canvas.width = this.memCanvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.memCanvas.height = this.canvas.offsetHeight;
    this.ctx.putImageData(imageData, 0, 0);
    this.memCtx.putImageData(imageData, 0, 0);
  }

  start(e) {
    const pos = 'touches' in e ? e.touches[0] : e;
    const rect = e.currentTarget.getBoundingClientRect();
    const posPoints = {
      x: Math.round(pos.clientX - rect.left),
      y: Math.round(pos.clientY - rect.top),
    };

    if (posPoints.x < 0 || posPoints.y < 0) {
      return;
    }

    this.started = true;
    this.points.push(posPoints);
  }

  move(e) {
    if (!this.enabled) {
      this.started = false;
      return;
    }
    const pos = 'touches' in e ? e.touches[0] : e;
    const rect = e.currentTarget.getBoundingClientRect();
    const posPoints = {
      x: Math.round(pos.clientX - rect.left),
      y: Math.round(pos.clientY - rect.top),
    };

    if (!this.started) {
      if (posPoints.x < 0 || posPoints.y < 0) {
        return;
      }
      this.started = true;
      this.points.push(posPoints);
    } else {
      if (posPoints.x < 0 || posPoints.y < 0) {
        this.end(e);
        return;
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.memCanvas, 0, 0);
      this.points.push(posPoints);
      this.drawPoints(this.points);
    }
  }

  end(e) {
    if (this.started) {
      this.started = false;
      this.memCtx.clearRect(0, 0, this.width, this.height);
      this.memCtx.drawImage(this.canvas, 0, 0);
      this.points = [];
    }
  }

  clear() {
    this.points = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.memCtx.clearRect(0, 0, this.width, this.height);
  }

  drawPoints(points) {
    if (this.points.length === 0) {
      return;
    }
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    if (this.points.length < 4) {
      let b = points[0];
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, this.lineWidth / 2, 0, Math.PI * 2, !0);
      this.ctx.closePath();
      this.ctx.fillStyle = this.strokeStyle;
      this.ctx.fill();
      return;
    }
    this.ctx.beginPath(), this.ctx.moveTo(points[0].x, points[0].y);
    let i;
    for (i = 1; i < points.length - 2; i++) {
      let c = (points[i].x + points[i + 1].x) / 2,
          d = (points[i].y + points[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    this.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y), this.ctx.stroke();
  }
}

let canvasAll = document.querySelectorAll('.painting-canvas');
canvasAll.forEach(function(el) {
  new PaintingCanvas(el);
});

const clearEvent = new Event('clearcanvas', {'bubbles': true, 'cancelable': false});
const resizeEl = new Event('resizeel', {'bubbles': true, 'cancelable': false});

if (document.querySelector('.painting-palette__button')) {
document.querySelector('.painting-palette__button').addEventListener('click', function() {
  canvasAll.forEach(function(item) {
    item.dispatchEvent(clearEvent);
  });
  this.classList.toggle('disabled');
});
}
