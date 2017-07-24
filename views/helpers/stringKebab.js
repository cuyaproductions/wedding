/**
 * Turns any string into a lower-case kebab string.
 * @param {string} text The text to turn into a url.
 * @returns {string} The url from the text.
 */
function stringKebab (text) {
  return text.replace(' ', '-').toLowerCase();
}

export default stringKebab;