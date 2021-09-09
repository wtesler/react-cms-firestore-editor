export let ACCESS_DENIED = 'Access Denied.';
export let DELETING = 'Deleting...';
export let EDIT_WEBSITE = 'Edit Website Content';
export let FAILED_DELETE_SECTION = 'Failed to delete section. Please try again.';
export let FAILED_LOAD_CMS = 'Failed to load CMS. Try reloading the page.';
export let FAILED_SAVE_CMS = 'Failed to save cms. Please try again.';
export let SAVE = 'Save';
export let SAVING = 'Saving...';

function localize(code) {
  if (code.startsWith('zh')) {

  } else if (code.startsWith('es')) {

  }
}

class i18n {
  constructor() {
    try {
      const languageCode = window.navigator.language;
      localize(languageCode);
    } catch (e) {
      console.warn('Localization Failed');
      console.warn(e);
    }
  }
}

const i18nInstance = new i18n();

export default i18nInstance;
