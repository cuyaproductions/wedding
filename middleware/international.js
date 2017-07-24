import YAML from 'yamljs';

// Load language files.
const spanish = YAML.load('./langs/spanish.yml');
const english = YAML.load('./langs/english.yml');

/**
 * Accepted languages.
 *
 * @enum
 */
const Languages = {
  EN: 'en',
  ES: 'es',
};

/**
 * Parses the Accept-Language header to figure out what language to redirect to.
 *
 * @param {express.Request} request HTTP request object.
 * @todo Handle non-english or non-spanish languages.
 */
function parseAcceptLanguageHeader(request) {
  const rawHeader = request.get('Accept-Language');
  const matchedLanguages =  rawHeader.match(/(\w{2})(-|;)\w/);

  if (matchedLanguages[1] === Languages.ES) {
    return matchedLanguages[1];
  }

  return Languages.EN;
}

/**
 * Middleware to sort out what language to serve.
 *
 * @param {express.Request} request HTTP request object.
 * @param {express.Response} response HTTP response object.
 * @param {function} next Calls next middleware.
 */
function findLanguage (request, response, next) {
  // If no language was detected, redirect to english
  if (!request.params.lang) {
    const languageToRedirectTo = parseAcceptLanguageHeader(request);
    response.redirect(`/${languageToRedirectTo}${request.originalUrl}`);
    return;
  }
  const lang = request.params.lang;

  switch (lang.toLocaleLowerCase()) {
    case Languages.ES: {
      request.content = spanish;
      break;
    }
    case Languages.ES:
    default: {
      request.content = english;
    }
  }

  next();
}

export default findLanguage;