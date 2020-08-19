function removeAds(root) {
  for (let node of root.querySelectorAll('span')) {
    if (node.textContent.startsWith('Promoted')) {
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
  }
}

setTimeout(removeAds, 0, document);

const observer = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.addedNodes.length !== 0) {
      removeAds(mutation.target);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
