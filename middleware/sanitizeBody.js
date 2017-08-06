/**
 * Replaces any suspicious characters with HTML entities.
 * 
 * @param {String} string The string to sanitize.
 * @returns {String} The sanitized string.
 */
function sanitizeString(string) {
  let result = string;
  result = result.replace(/&/g, '&amp;');
  result = result.replace(/</g, '&lt;');
  result = result.replace(/>/g, '&gt;');
  result = result.replace(/"/g, '&quot;');
  result = result.replace(/'/g, '&apos;');
  result = result.replace(/=/g, '&#61;');
  return result;
}

/**
 * Sanitizes any string that is in the request body payload.
 * 
 * @param {express.Request} request HTTP request object.
 * @param {express.Response} response HTTP response object.
 * @param {function} next Calls next middleware.
 */
function sanitizeBody (request, response, next) {
  const { body } = request;

  if (body) {
    for (const bodyKey of Object.keys(body)) {
      const bodyValue = body[bodyKey];

      if (typeof bodyValue === 'string') {
        body[bodyKey] = sanitizeString(bodyValue);
      }
    }
  }

  next();
}

export default sanitizeBody;