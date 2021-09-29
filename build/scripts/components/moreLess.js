/**
 * .more-less component
 *
 */

class MoreLess {
  constructor(el) {
    this.el = el;
    this.less = el.querySelector('.more-less__less');
    this.more = el.querySelector('.more-less__more');
    this.moreInner = this.more.querySelector('.more__inner');
    this.button = el.querySelector('.more-less__button');

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.button.addEventListener('click', (e) => this.onClick(e), { passive: true });
  }

  onClick(e) {
    this.more.style.overflow = 'hidden';
    this.el.classList.add('more-less--animating');
    if (this.isClosing || !this.el.classList.contains('more-less--active')) {
      this.open();
    } else if (this.isExpanding || this.el.classList.contains('more-less--active')) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = this.moreInner.offsetHeight + 'px';
    const endHeight = '0px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.more.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.el.classList.add('more-less--active');
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = '0px';
    const endHeight = this.moreInner.offsetHeight + 'px';

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.more.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(active) {
    this.el.classList.toggle('more-less--active', active);
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.more.style.height = this.el.style.overflow = '';
    this.button.querySelector('span').innerHTML = active ? 'less' : 'more';
    this.el.classList.remove('more-less--animating');
  }
}

document.querySelectorAll('.more-less').forEach(function(el) {
  new MoreLess(el);
});
