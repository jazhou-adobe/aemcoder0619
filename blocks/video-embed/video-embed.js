export default async function decorate(block) {
  const row = block.children[0];
  const cell = row && row.children[0];
  if (!cell) return;

  // Extract the YouTube URL from the link in the cell
  const link = cell.querySelector('a');
  const url = link ? link.href : cell.textContent.trim();

  // Parse YouTube video ID from various URL formats
  let videoId = '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      videoId = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
    } else if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    }
  } catch (e) {
    videoId = url;
  }

  if (!videoId) return;

  // Build responsive embed
  const container = document.createElement('div');
  container.className = 'video-container';

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = '2025APCS & Mayors\' Forum in Expo City Dubai';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  container.appendChild(iframe);

  // Replace block content with the embed
  block.textContent = '';
  block.appendChild(container);
}
