export default function decorate(block) {
  // Simple page title banner - ensure semantic h1 structure
  const h1 = block.querySelector('h1');
  if (!h1) {
    const firstDiv = block.querySelector('div > div');
    if (firstDiv) {
      const heading = document.createElement('h1');
      heading.textContent = firstDiv.textContent;
      firstDiv.replaceChildren(heading);
    }
  }
}
