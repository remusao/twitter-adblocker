function removeAds(root) {
  for (let node of [...root.querySelectorAll('span')].filter((s) =>
    s.textContent.startsWith('Promoted'),
  )) {
    for (
      let level = 0;
      level < 15 && node !== document.body && node.parentNode !== null;
      level += 1
    ) {
      if (
        (node.parentNode.classList.length === 0 &&
          node.parentNode.id === '' &&
          node.parentNode.style.length === 0) ||
        node.getAttribute('data-testid') === 'UserCell' ||
        node.getAttribute('data-testid') === 'trend'
      ) {
        node.parentNode.removeChild(node);
        break;
      }
      node = node.parentNode;
    }
  }
}

setTimeout(() => {
  removeAds(document);
}, 0)

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    for (const node of mutation.addedNodes) {
      removeAds(mutation.target);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
