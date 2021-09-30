/**
 * Slide over scroll
 *
 */
if (document.querySelector("#issues")) {
slidePagesCheck();
document.querySelector('#issues').addEventListener('scroll', function(e) {
  window.requestAnimationFrame(slidePagesCheck);
}, { passive: true });
document.addEventListener('scroll', function(e) {
  window.requestAnimationFrame(slidePagesCheck);
}, { passive: true });

function slidePagesCheck() {
  const issuesEl = document.querySelector('#issues');
  const viewHeight = Math.min(window.innerHeight, issuesEl.offsetHeight);
  const issues = document.querySelectorAll('#issues .issues__item');
  const issuesHeight = issuesEl.scrollHeight;

  issues.forEach(item => {
    const itemHeight = item.offsetHeight;
    const itemPos = item.getBoundingClientRect().top;
    const frameDifference = (itemPos + itemHeight - viewHeight) * -1;
    const topOffset = viewHeight - itemHeight;
    if (frameDifference >= 0) {
      if (!item.classList.contains('sticky')) {
        item.classList.add('sticky');
      }
    } else {
      if (item.classList.contains('sticky')) {
        item.classList.remove('sticky');
      }
    }
    item.style.top = topOffset + 'px';
  });
}
}
