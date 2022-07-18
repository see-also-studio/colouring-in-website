const releasedIssues = document.querySelectorAll('.issues__item[data-released]');
const anchorIssue = releasedIssues[releasedIssues.length - 1];
const browserWidth = window.innerWidth;

if (releasedIssues && browserWidth >= 680) {
  anchorIssue.parentNode.scrollTo({
    top: anchorIssue.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
}
