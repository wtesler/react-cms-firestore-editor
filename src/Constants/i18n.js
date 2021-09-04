export let ACCESS_DENIED = 'Access Denied.';
export let ACCOUNT_EXISTS = 'Profiles exists. Use an alternate login method.';
export let CERTIFICATION = 'Certification';
export let COMMUNITY = 'Community';
export let COPYRIGHT_2021 = 'Copyright 2021';
export let DASHBOARD = 'Dashboard';
export let DATA = 'Data';
export let DELETING = 'Deleting...';
export let DIRECTORY = 'Directory';
export let DOCUMENTS = 'Documents';
export let EDIT_WEBSITE = 'Edit Website Content';
export let EMAIL_ADDRESS = 'Email Address';
export let EMAIL_NEEDED = 'Please provide your email address again for confirmation';
export let EMAIL_SENT = "Click the link that was just sent to your email. You may close this window.";
export let ENABLE_COOKIES = 'Enable cookies for proper experience';
export let FAILED_DELETE_SECTION = 'Failed to delete section. Please try again.';
export let FAILED_LOAD_CMS = 'Failed to load CMS. Try reloading the page.';
export let FAILED_LOAD_PROFILE = 'Failed to load profile. Try reloading the page.';
export let FAILED_SAVE_CMS = 'Failed to save cms. Please try again.';
export let FAILED_SAVE_PHOTO = 'Failed to save photo. Please try again.';
export let FAILED_SAVE_PROFILE = 'Failed to save profile. Please try again.';
export let GOOD_MORNING = 'Good Morning!';
export let GOOD_AFTERNOON = 'Good Afternoon!';
export let GOOD_EVENING = 'Good Evening!';
export let HELP = 'Help';
export let HOME = 'Home';
export let HOW_IT_WORKS = 'How it Works';
export let LINK_INVALID = 'Link no longer valid';
export let LOGGING_IN = 'Logging In...';
export let LOGIN_FAILED = 'Login Failed';
export let LOGOUT_FAILED = 'Logout Failed';
export let LOGIN_PROMPT = 'Select an option below to sign in or to create a new account.';
export let LOGOUT = 'Log out';
export let MISSION = 'Mission';
export let NEWS = 'News';
export let PAGE_NOT_FOUND = 'Page not found';
export let PRIVACY_POLICY = 'Privacy Policy';
export let PROFILE = 'Profile';
export let PROFILE_SETUP = 'Edit your profile';
export let SAVE = 'Save';
export let SAVE_CHANGES = 'Save Changes';
export let SAVING = 'Saving...';
export let SIGN_IN_GOOGLE = 'Sign in with Google';
export let SIGN_IN_EMAIL = 'Sign in with Email';
export let SURVEY = 'Survey';
export let TERMS_OF_SERVICE = 'Terms of Service';
export let TEXT_LINK = 'Text Link';
export let TITLE = 'MIVIE';
export let TITLE_LONG = 'Minority Impact Value Indicator for Equity';
export let UNAUTHORIZED = 'Unauthorized';
export let UPLOAD = 'Upload';
export let UPLOAD_IMAGE = 'Upload an Image';

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
