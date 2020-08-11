function removeNode(root) {
  let node = root;
  for (
    let level = 0;
    node !== document.body && node.parentNode !== null;
    level += 1
  ) {
    const testid = node.getAttribute('data-testid');
    if (
      testid !== null &&
      (testid === 'placementTracking' ||
        testid === 'trend' ||
        testid === 'UserCell')
    ) {
      node.parentNode.removeChild(node);
      break;
    }
    node = node.parentNode;
  }
}

function removeAds(root) {
  for (const node of root.querySelectorAll('span')) {
    if (node.textContent === 'Promoted') {
      removeNode(node);
    }
  }
}

setTimeout(removeAds, 0, document);

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.addedNodes.length !== 0) {
      for (const node of mutation.addedNodes) {
        if (
          (node.tagName === 'DIV' || node.tagName === 'ASIDE') &&
          node.textContent.includes('Promoted')
        ) {
          removeAds(node);
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
