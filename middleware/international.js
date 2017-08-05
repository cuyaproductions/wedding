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
 * A set of accepted languages for easy checking.
 * 
 * @type {Set}
 */
const acceptedLanguages = new Set(Object.keys(Languages).map(langKey => Languages[langKey]));

/**
 * Parses the Accept-Language header to figure out what language to redirect to.
 *
 * @param {express.Request} request HTTP request object.
 * @todo Handle non-english or non-spanish languages.
 */
function parseAcceptLanguageHeader(request) {
  const rawHeader = request.get('Accept-Language');
  const matchedLanguages =  rawHeader.match(/(\w{2})(-|;)\w/);

  if (acceptedLanguages.has(matchedLanguages[1])) {
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
  const { lang } = request.params; 

  // If no language was detected, redirect to english
  if (!lang || !acceptedLanguages.has(lang)) {
    const languageToRedirectTo = parseAcceptLanguageHeader(request);
    response.redirect(`/${languageToRedirectTo}${request.originalUrl}`);
    return;
  }

  switch (lang.toLowerCase()) {
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