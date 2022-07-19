/**
 * Repeat bar content
 *
 */

class InfoBar {
  constructor(el) {
    this.el = el;
    this.inner = this.el.querySelector('span');
    this.barWidth = this.el.offsetWidth;
    this.barInnerWidth = this.inner.offsetWidth;
    this.repeat();
  }

  repeat() {
    if (this.barWidth > this.barInnerWidth) {
      const divide = Math.ceil(this.barWidth / this.barInnerWidth);

      for (let i = 0; i < divide; i++) {
        this.el.innerHTML += '<span class="clone">' + this.inner.innerHTML + '</span>';
      }
    }
  }
}

const bars = document.querySelectorAll('.bar');
bars.forEach(function(el) {
  new InfoBar(el);
});
