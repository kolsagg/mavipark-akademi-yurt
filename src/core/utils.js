/**
 * Core utility functions
 */

/** Guard flag to prevent multiple listener attachments (HMR safety) */
let _imageErrorHandlerAttached = false;

/** Local SVG placeholder as last-resort fallback */
const LOCAL_FALLBACK_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%231a1a2e' width='800' height='600'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23555' font-family='sans-serif' font-size='14'%3EG%C3%B6rsel%20y%C3%BCklenemedi%3C/text%3E%3C/svg%3E";

/**
 * Returns a Picsum Photos URL as a fallback image
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @returns {string} URL to fallback image
 */
export function getImageFallback(width = 800, height = 600) {
  return `https://picsum.photos/${width}/${height}`;
}

/**
 * Attaches a global error listener to handle broken images.
 * Uses a two-tier fallback: Picsum Photos first, local SVG second.
 */
export function setupImageErrorHandling() {
  if (_imageErrorHandlerAttached) return;
  _imageErrorHandlerAttached = true;

  document.addEventListener('error', function (event) {
    const target = event.target;

    // Only handle image element errors
    if (target.tagName && target.tagName.toLowerCase() === 'img') {
      if (!target.dataset.hasFailed) {
        // First failure: try Picsum Photos with keyword if available
        target.dataset.hasFailed = 'true';

        const keyword = target.dataset.fallback || 'bedroom';
        console.warn(`[AkademiSuit] Image load failed: ${target.src}, using fallback for '${keyword}'.`);

        const width = target.clientWidth || target.getAttribute('width') || 800;
        const height = target.clientHeight || target.getAttribute('height') || 600;

        // Use Source Unsplash for better keyword matching if possible, otherwise Picsum
        target.src = `https://source.unsplash.com/featured/${width}x${height}/?${keyword}`;
      } else if (!target.dataset.hasFailedTwice) {
        // Second failure: use local SVG placeholder (guaranteed)
        target.dataset.hasFailedTwice = 'true';
        target.src = LOCAL_FALLBACK_SVG;
      }
    }
  }, true); // Use capture phase to catch img errors which don't bubble
}
