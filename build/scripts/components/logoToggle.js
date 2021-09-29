/**
 * Toggle logo fill on click
 *
 */
document.querySelector('.logo').addEventListener('click', function(e) {
  e.preventDefault();
  el = e.currentTarget.classList.toggle('text-outline');
});
