const SETTINGS_STORAGE_KEY = 'settings';

export const BUTTON_MODE_KEY = 'buttonMode';
const BASIC_BUTTON_MODE_INDICATOR = 'Basic';
export const ADVANCED_BUTTON_MODE_INDICATOR = 'Advanced';

export const SCROLL_TO_TOP_ONLY_BASIC_BUTTON_MODE = 'scrollToTopOnlyBasic';

export const SCROLL_TO_TOP_ONLY_ADVANCED_BUTTON_MODE = 'scrollToTopOnlyAdvanced';
export const FLIP_ADVANCED_BUTTON_MODE = 'flipBetweenTopBottomAdvanced';
export const DUAL_ARROWS_ADVANCED_BUTTON_MODE = 'dualArrowsAdvanced';

export const SCROLL_TO_TOP_ONLY_EXPERT_BUTTON_MODE = 'off';
export const FLIP_EXPERT_BUTTON_MODE = 'flip';
export const DUAL_ARROWS_EXPERT_BUTTON_MODE = 'dual';

const PREVIOUS_VERSION_STORAGE_KEY = 'previousVersion';
const PREVIOUS_VERSION_8_PREFIX = '8.';

export const HAVE_GRANTED_PERMISSIONS_AT_LEAST_ONCE_KEY = 'haveGrantedPermissionsAtLeastOnce';

export function isBasicButtonMode( mode ) {
  return isButtonMode( mode, BASIC_BUTTON_MODE_INDICATOR );
}

export function isAdvancedButtonMode( mode ) {
  return isButtonMode( mode, ADVANCED_BUTTON_MODE_INDICATOR );
}

export function isExpertButtonMode( mode ) {
  // @todo Handle a case when the value is non-supported (corrupted for some reason).
  return ! isBasicButtonMode( mode ) && ! isAdvancedButtonMode( mode );
}

function isButtonMode( mode, modeIndicator ) {
  return poziworldExtension.utils.isNonEmptyString( mode ) && mode.includes( modeIndicator );
}

export function getExpertModeReplacement( mode ) {
  let replacementMode;

  switch ( mode ) {
    case SCROLL_TO_TOP_ONLY_EXPERT_BUTTON_MODE:
    {
      replacementMode = SCROLL_TO_TOP_ONLY_ADVANCED_BUTTON_MODE;

      break;
    }
    case FLIP_EXPERT_BUTTON_MODE:
    {
      replacementMode = FLIP_ADVANCED_BUTTON_MODE;

      break;
    }
    case DUAL_ARROWS_EXPERT_BUTTON_MODE:
    {
      replacementMode = DUAL_ARROWS_ADVANCED_BUTTON_MODE;

      break;
    }
    default:
    {
      replacementMode = SCROLL_TO_TOP_ONLY_BASIC_BUTTON_MODE;

      break;
    }
  }

  return replacementMode;
}

export async function getButtonMode() {
  const settings = await getSettings();

  if ( settings ) {
    return settings[ BUTTON_MODE_KEY ];
  }

  // @todo Throw?
  return '';
}

export async function getSettings() {
  try {
    const { [ SETTINGS_STORAGE_KEY ]: settings } = await retrieveSettingsFromStorage();

    if ( isExpectedFormat( settings ) ) {
      return settings;
    }

    // @todo Localize?
    throw new TypeError( 'Settings retrieved from the storage appear to be corrupted.' );
  }
  catch ( error ) {
    // @todo
  }
}

export async function setSettings( settings ) {
  return browser.storage.sync.set( {
    [ SETTINGS_STORAGE_KEY ]: {
      ...await getSettings(),
      ...settings,
    },
  } );
}

async function retrieveSettingsFromStorage() {
  return browser.storage.sync.get( SETTINGS_STORAGE_KEY );
}

function isExpectedFormat( settings ) {
  return poziworldExtension.utils.isType( settings, 'object' ) && ! Global.isEmpty( settings );
}

/**
 * Version 8 of the extension required permissions granted upon installation.
 * There was no way to carry over the content scripts' “<all_urls>” as an origin permission, so when updated to version 9 users have grant the permissions again in Options. Otherwise, the extension would only work when activeTab is invoked.
 *
 * @see {@link https://developer.chrome.com/extensions/activeTab}
 */

export async function hadVersion8InstalledBefore() {
  try {
    const { [ PREVIOUS_VERSION_STORAGE_KEY ]: previousVersion } = await browser.storage.local.get( PREVIOUS_VERSION_STORAGE_KEY );

    return poziworldExtension.utils.isNonEmptyString( previousVersion ) && previousVersion.startsWith( PREVIOUS_VERSION_8_PREFIX );
  }
  catch ( error ) {
    // @todo
  }
}

export async function haveGrantedPermissionsAtLeastOnce() {
  try {
    const { [ HAVE_GRANTED_PERMISSIONS_AT_LEAST_ONCE_KEY ]: granted } = await browser.storage.local.get( HAVE_GRANTED_PERMISSIONS_AT_LEAST_ONCE_KEY );

    return poziworldExtension.utils.isType( granted, 'boolean' ) && granted;
  }
  catch ( error ) {
    // @todo
  }
}