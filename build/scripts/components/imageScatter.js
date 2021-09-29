/**
 * Issue image scatter
 *
 */
function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArray(x, y) {
  let a = [];
  for (let i = x; i <= y; i++) {
    a.push(i);
  }
  let j, z;
  for (let i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    z = a[i];
    a[i] = a[j];
    a[j] = z;
  }
  return a;
}

const imageButtons = document.querySelectorAll('.image-button:not(.disabled)');
imageButtons.forEach(function(item) {
  item.addEventListener('click', function(e) {
    const el = e.currentTarget;
    const imagesList = el.parentNode.parentNode.querySelector('.issues__images');
    imagesList.classList.add('issues__images--active');
    imageScatter(imagesList);
  }, { passive: true });
});

const imagesWrappers = document.querySelectorAll('.issues__images');
imagesWrappers.forEach(function(item) {
  item.addEventListener('click', imageRemove, { passive: true });
  item.addEventListener('wheel', imageRemove, { passive: true });
});

function imageRemove(e) {
  const el = e.currentTarget;
  el.classList.remove('issues__images--active');
}
function imageScatter(el) {
  const images = el.querySelectorAll('li');
  const zonesX = randomArray(1, images.length);
  const zonesY = randomArray(1, images.length);
  const interval = 100 / images.length;
  const delay = randomArray(0, images.length - 1);
  images.forEach(function(item, i, arr) {
    const random = {
      left: randomFromRange(zonesX[i] * interval - ((interval / 4) * 3), zonesX[i] * interval - interval / 4),
      top: randomFromRange(zonesY[i] * interval - ((interval / 4) * 3), zonesY[i] * interval - interval / 4),
      delay: delay[i],
    };
    const styles = '--random-top: ' + random.top + '; ' +
                   '--random-left: ' + random.left + ';' +
                   '--delay: ' + random.delay * 100 + ';';
    item.style.cssText = styles;
  });
}
