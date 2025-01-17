import LanguageDetector from 'i18next-browser-languagedetector';

import utils from 'Shared/utils';
import * as eventsHelpers from 'Shared/events';
import * as settingsHelpers from 'Shared/settings';

/**
 * The platform natively supports only a limited set of locales (https://developer.chrome.com/webstore/i18n?csw=1#localeTable).
 * Use a third-party tool to support all locales (languages).
 * Replace browser.i18n.getMessage with poziworldExtension.i18n.getMessage.
 *
 * Based on https://github.com/PoziWorld/PoziTone/commit/49fe3bd2bb9820b923552e8d4703d35143fcce41
 */

/**
 * @todo Get dynamically or don't forget to update.
 */

const LOCALES = [
  // First one ever supported
  'en_US',

  // Added over time
  'bg',
  'cs',
  'da',
  'gl',
  'ja',
  'nl',
  'pl',
  'ru',
  'tr',
  'zh_CN'
];

const DEFAULT_LOCALE = LOCALES[ 0 ];

/**
 * Locale to be used.
 *
 * @type {string}
 */

let locale = '';

/**
 * https://github.com/i18next/i18next-browser-languageDetector#detector-options.
 */

const i18nextBrowserLanguageDetectorOptions = {
  order: [
    'browserExtension'
  ]
};

/**
 * https://github.com/i18next/i18next-xhr-backend#backend-options.
 */

const i18nextXhrBackendOptions = {
  loadPath: browser.runtime.getURL( '_locales/{{lng}}/messages.json' ),
  async: false
};

/**
 * https://github.com/i18next/i18next-browser-languageDetector#adding-own-detection-functionality
 */

const browserExtensionDetector = {
  name: 'browserExtension',
  lookup: getLanguage
};

let languageDetectorSetAttemptsCounter = 0;
const LANGUAGE_DETECTOR_SET_ATTEMPTS_MAX_COUNT = 5;
const LANGUAGE_DETECTOR_SET_ATTEMPTS_DELAY_MS = 500;
let languageDetector = null;

/**
 * https://www.i18next.com/configuration-options.html
 */

const i18nextOptions = {
  initImmediate: false,
  detection: i18nextBrowserLanguageDetectorOptions,
  backend: i18nextXhrBackendOptions,
  fallbackLng: {
    'default': [
      DEFAULT_LOCALE
    ]
  },
  load: 'currentOnly',
  ns: 'messages',
  defaultNS: 'messages',
  // Default `nsSeparator` of “:” splits URLs when looking up
  nsSeparator: ':::',
};

/**
 * https://www.i18next.com/api.html#t
 *
 * @callback I18n~t
 */

/**
 * @typedef {I18n~t} T
 */

let translationFunction;

setUp();

async function setUp() {
  exposeApi();

  languageDetector = await setLanguageDetector();

  languageDetector.addDetector( browserExtensionDetector );

  stubLog();
}

function exposeApi() {
  if ( typeof window.poziworldExtension === 'undefined' ) {
    window.poziworldExtension = {};
  }

  if ( ! window.poziworldExtension.i18n ) {
    window.poziworldExtension.i18n = new I18n();
  }

  signalApiExposed();
}

function signalApiExposed() {
  eventsHelpers.fireEvent( eventsHelpers.EVENT_NAMES.i18nExposed );
}

/**
 * In some contexts (for example, content scripts), Log might not be defined.
 */

function stubLog() {
  if ( typeof Log === 'undefined' ) {
    window.Log = {
      add: function () {}
    };
  }
}

/**
 * @constructor
 */

function I18n() {
}

/**
 * Initialize. Identify language to be used and load the translations.
 *
 * @return {Promise<string>|Promise<void>}
 */

I18n.prototype.init = function () {
  const initialized = Boolean( getTranslationFunction() );
  Log.add( 'poziworldExtension.i18n.init', {
    initialized: initialized,
  } );

  if ( initialized ) {
    return Promise.resolve();
  }

  return setLanguage()
    .then( loadLanguage );
};

/**
 * https://developer.chrome.com/extensions/i18n#method-getMessage replacement.
 *
 * @param {string} key - The name of the message, as specified in the messages.json file.
 * @param {(string|number)[]} [substitutions]
 * @return {string}
 */

I18n.prototype.getMessage = function ( key, substitutions ) {
  Log.add( 'poziworldExtension.i18n.getMessage', {
    key: key,
    substitutions: substitutions,
  } );

  const t = getTranslationFunction();

  if ( t ) {
    // i18next treats messages.json keys as objects:
    // To get translation for “extensionName”, get “message” property of the “extensionName” object
    const objectProperty = '.message';
    const lookup = key + objectProperty;
    let message = t( lookup );

    if ( Array.isArray( substitutions ) ) {
      // Find all $PLACEHOLDER$ variables in the message property
      // Example: find “$VOLUME_LEVEL$” in “Sound volume — $VOLUME_LEVEL$%”
      const placeholders = message.match( /(\$.[A-Z0-9_]*\$)/g );

      if ( Array.isArray( placeholders ) ) {
        while ( placeholders.length ) {
          const placeholder = placeholders.shift();
          // $VOLUME_LEVEL$ -> volume_level
          const placeholderKey = placeholder.replace( /\$/g, '' ).toLowerCase();
          // In messages.json, indices start with 1 ("content": "$1"), but from 0 in the array
          const substitutionIndex = Number( t( key + '.placeholders.' + placeholderKey + '.content' ).replace( /\$/, '' ) ) - 1;

          message = message.replace( placeholder, substitutions[ substitutionIndex ] );
        }
      }
    }
    // Translation isn't found: Output as it is, but without “debugging” info
    else if ( message === lookup ) {
      message = key;
    }

    return message;
  }

  return handleTranslationException();
};

/**
 * Identify what language should be used:
 * If user set a preference, use that.
 * Otherwise, check whether the browser UI language can be used.
 * If not, loop through other languages set in browser.
 * Last resort is to use the extension default.
 *
 * @return {Promise<string>}
 */

function setLanguage() {
  return new Promise( getLanguagePreferences )
    .then( setLanguageToPreferred )
    .catch( setLanguageToDefault );
}

/**
 * If user set a language preference, use that.
 * Otherwise, check whether the browser UI language can be used.
 * If not, loop through other languages set in browser.
 *
 * @param {resolve} resolve
 * @param {reject} reject
 */

async function getLanguagePreferences( resolve, reject ) {
  if ( ! settingsHelpers.areSettingsReady() ) {
    settingsHelpers.addSettingsReadyEventListener( () => getLanguagePreferences( resolve, reject ) );

    return;
  }

  try {
    const settings = await settingsHelpers.getSettings();

    getExtensionLanguageSettings( resolve, reject, settings );
  }
  catch ( error ) {
    getBrowserLanguageSettings( resolve, reject );
  }
}

/**
 * If user set a language preference in Options, use that.
 *
 * @param {resolve} resolve
 * @param {reject} reject
 * @param {Object} settings - Key-value pairs.
 */

function getExtensionLanguageSettings( resolve, reject, settings ) {
  if ( window.poziworldExtension.utils.isType( settings, 'object' ) ) {
    const language = settings.uiLanguage;

    if ( ! language || language === 'browserDefault' ) {
      getBrowserLanguageSettings( resolve, reject );
    }
    else if ( window.poziworldExtension.utils.isType( language, 'string' ) ) {
      resolve( language );
    }
    else {
      reject( language );
    }
  }
}

/**
 * Check whether the browser UI language can be used.
 * If not, loop through other languages set in browser.
 * Last resort is to use the extension default.
 *
 * @param {resolve} resolve
 * @param {reject} reject
 */

function getBrowserLanguageSettings( resolve, reject ) {
  let languageCode = browser.i18n.getUILanguage();

  if ( languageCode ) {
    languageCode = formatLanguageCode( languageCode );
  }

  if ( languageCode && isSupported( languageCode ) ) {
    resolve( languageCode );

    return;
  }
  else {
    const browserLanguages = window.navigator.languages;

    if ( Array.isArray( browserLanguages ) ) {
      // navigator.languages is read-only, not shiftable
      const languageCodes = Array.from( browserLanguages );

      while ( languageCodes.length ) {
        languageCode = formatLanguageCode( languageCodes.shift() );

        if ( isSupported( languageCode ) ) {
          resolve( languageCode );

          return;
        }
      }
    }
  }

  resolve( DEFAULT_LOCALE );
}

/**
 * A specific language should be used, as set in the extension or browser settings.
 *
 * @param {string} language
 */

function setLanguageToPreferred( language ) {
  locale = language;
}

/**
 * Use the default language when failed to identify which one to use.
 */

function setLanguageToDefault() {
  locale = DEFAULT_LOCALE;
}

/**
 * Language to be used identified, try to load it.
 */

function loadLanguage() {
  new Promise( initI18next )
    .then( handleInitSuccess )
    .catch( handleInitError );
}

/**
 * Initialize i18next, a third-party internationalization framework.
 * https://www.i18next.com/
 *
 * @param {resolve} resolve
 * @param {reject} reject
 */

function initI18next( resolve, reject ) {
  i18next
    .use( getLanguageDetector() )
    .use( i18nextXHRBackend )
    .init(
      getI18nextOptions(),
      handleI18nextInitCallback.bind( null, resolve, reject )
    );
}

/**
 * Initialization succeeded.
 */

function handleInitSuccess() {
  Log.add( 'poziworldExtension.i18n -> handleInitSuccess' );
}

/**
 * Initialization failed.
 *
 * @param {string[]} [errors]
 */

function handleInitError( errors ) {
  Log.add( 'poziworldExtension.i18n -> handleInitError', errors, true );
}

/**
 * Called after all translations were loaded or with an error when failed (in case of using a backend).
 *
 * @param {resolve} resolve
 * @param {reject} reject
 * @param {string[]} [errors]
 * @param {T} [t]
 */

function handleI18nextInitCallback( resolve, reject, errors, t ) {
  checkForInitErrors( errors, reject );
  checkForInitSuccess( t, resolve, reject );
}

/**
 * Check whether initialization failed (in case of using a backend).
 *
 * @param {string[]} [errors]
 * @param {reject} reject
 */

function checkForInitErrors( errors, reject ) {
  Log.add( 'poziworldExtension.i18n -> checkForInitErrors', errors );

  if ( Array.isArray( errors ) ) {
    reject( errors );
  }
}

/**
 * Check whether initialization succeeded (in case of using a backend).
 *
 * @param {T} [t]
 * @param {resolve} resolve
 * @param {reject} reject
 */

function checkForInitSuccess( t, resolve, reject ) {
  if ( setTranslationFunction( t ) ) {
    resolve();

    saveExtensionLanguage();
  }
  else {
    reject();
  }
}

/**
 * Remember the set language (used for debugging).
 */

function saveExtensionLanguage() {
  /**
   * @todo Use a listener instead, fire callbacks here.
   */

  if ( typeof objConstUserSetUp === 'object' ) {
    objConstUserSetUp.language = getSetLanguage();
  }
}

/**
 * Most likely, third-party framework hasn't been initialized.
 *
 * @return {string}
 */

function handleTranslationException() {
  // Message contains “encoded” email – decode it
  const element = window.document.createElement( 'span' );

  element.innerHTML = 'Failed to load language file – please notify developer at &#115;&#116;&#116;&#98;&#45;&#105;&#49;&#56;&#110;&#64;&#112;&#111;&#122;&#105;&#119;&#111;&#114;&#108;&#100;&#46;&#99;&#111;&#109;';

  return element.textContent;
}

/**
 * Return the language name that should be used.
 *
 * @return {string}
 */

function getLanguage() {
  return locale;
}

/**
 * Return the current detected or set language.
 * https://www.i18next.com/api.html#language
 *
 * @return {string}
 */

function getSetLanguage() {
  return i18next.language;
}

/**
 * Initialize language detector.
 *
 * @returns {i18nextBrowserLanguageDetector}
 */

async function setLanguageDetector() {
  if ( ! LanguageDetector && languageDetectorSetAttemptsCounter < LANGUAGE_DETECTOR_SET_ATTEMPTS_MAX_COUNT ) {
    languageDetectorSetAttemptsCounter += 1;
    await utils.sleep( LANGUAGE_DETECTOR_SET_ATTEMPTS_DELAY_MS );

    return setLanguageDetector();
  }

  return new LanguageDetector();
}

/**
 * Return language detector.
 *
 * @return {i18nextBrowserLanguageDetector}
 */

function getLanguageDetector() {
  return languageDetector;
}

/**
 * Return i18next options.
 *
 * @return {Object}
 */

function getI18nextOptions() {
  return i18nextOptions;
}

/**
 * Save translation function.
 *
 * @param {T} t
 * @return {boolean} - Whether the operation succeeded.
 */

function setTranslationFunction( t ) {
  if ( typeof t === 'function' ) {
    translationFunction = t;

    return true;
  }

  return false;
}

/**
 * Return translation function.
 *
 * @return {T}
 */

function getTranslationFunction() {
  return translationFunction;
}

/**
 * Convert the format returned by APIs (“-” as a separator) to the format used by extensions (“_” as a separator).
 *
 * @param {string} languageCode - en-US, en, ru
 * @return {string} - en_US, en, ru
 */

function formatLanguageCode( languageCode ) {
  return languageCode.replace( '-', '_' );
}

/**
 * Check whether there is a translation for the provided locale.
 *
 * @param {string} languageCode - en_US, en, ru
 * @return {boolean}
 */

function isSupported( languageCode ) {
  return LOCALES.indexOf( languageCode ) > -1;
}

/**
 * Resolve promise.
 *
 * @callback resolve
 */

/**
 * Reject promise.
 *
 * @callback reject
 */
