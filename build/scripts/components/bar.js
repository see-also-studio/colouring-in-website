/**
 * Repeat bar content
 *
 */

const bar = document.querySelector('.bar');
const barInner = bar.querySelector('span');

let barWidth = bar.offsetWidth;
let barInnerWidth = barInner.offsetWidth;

if (barWidth > barInnerWidth) {
  const divide = Math.ceil(barWidth / barInnerWidth);

  for (let i = 0; i < divide; i++) {
    bar.innerHTML += '<span class="clone">' + barInner.innerHTML + '</span>';
  }
}
