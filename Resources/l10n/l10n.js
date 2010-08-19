/*

Titanium L10N framework - Main logic

Copyright Igor Afanasyev <afan@mail.ru>

Version 1.0 - 2010-03-05

*/

//------------------------------------------------------------------------------
function L10NObject() {
//------------------------------------------------------------------------------
  this.LangPreferenceName = 'lang'; // change if you want to store language preference in some other variable
  this.LangUrlPreferenceName = 'lang-url'; // change if you want to store language URL preference in some other variable
  this.LangDir = 'lang'; // change if you want to store language files in some other directory
  this.DefaultLanguage = Titanium.Platform.locale //'en'; // change if you want to have another default language

  this.FileSignature = /^\[L10N\]/;
  this.LanguageFiles = {};
  this.LanguageOverrideFiles = {};
  this.Languages = [];
  this.UserLanguage = '';
  this.LoadedLanguage = '';
  this.LoadedLanguageFile = '';
  this.LocalizedStrings = {};

  this.LanguageNames = {
    'en'    : 'English',		// English
    'ru'    : 'Русский',		// Russian
    'fr'    : 'Français',		// French
    'de'    : 'Deutsch',		// German
    'ja'    : '日本語',			// Japanese
    'nl'    : 'Nederlands',		// Dutch
    'it'    : 'Italiano',		// Italian
    'es'    : 'Español',		// Spanish
    'pt-br' : 'Português',		// Portuguese (Brazil)
    'pt'    : 'Português (Portugal)',	// Portuguese (Portugal)
    'da'    : 'Dansk',			// Danish
    'fi'    : 'Suomi',			// Finnish
    'nb'    : 'Norsk (bokmål)',		// Norway
    'sv'    : 'Svenska',		// Swedish
    'ko'    : '한국어',			// Korean
    'zh-cn' : '简体中文',			// Chinese Simplified
    'zh-tw' : '繁體中文',			// Chinese Traditional
    'pl'    : 'Polski',			// Polish
    'tr'    : 'Türkçe',			// Turkish
    'uk'    : 'Українська',		// Ukrainian
    //'' : '',				// Arabic
    'hr'    : 'Hrvatski',		// Croatian
    'cs'    : '`Ce`stina',		// Czech
    'el'    : 'Ελληνικά',		// Greek
    'he'    : 'עברית',			// Hebrew
    'ro'    : 'Română',			// Romanian
    'sk'    : 'Slovenčina',		// Slovak
    //'' : '',				// Thai
    'id'    : 'Bahasa Indonesia'	// Indonesian
  };

  //----------------------------------------------------------------------------
  this.getLocalizedString = function (s, defaultString) {
  //----------------------------------------------------------------------------
    var result = this.LocalizedStrings[s];
    if (result) { return result; }
    if (defaultString) { return defaultString; }
    return '[' + s + ']';
  };

  //----------------------------------------------------------------------------
  this.getLanguageDisplayName = function (lang) { // e.g. 'en' or 'en-us', optional
  //----------------------------------------------------------------------------
    if (!lang) { lang = this.LoadedLanguage; } // use current language if not specidied

    var result = this.LanguageNames[lang]; // full language name (e.g. 'en-us')
    if (result) { return result; }

    result = this.LanguageNames[lang.substring(0,2)]; // just language ('en')
    if (result) { return result; } 

    return lang;
  };

  //----------------------------------------------------------------------------
  this.loadLanguage = function (lang) { // e.g. 'en' or 'en-us'
  //----------------------------------------------------------------------------
    Ti.API.debug('Loading language "' + lang + '"');

    var result = false;
    if (this.LanguageOverrideFiles[lang]) {
      result = this.loadLanguageFromFile(this.LanguageOverrideFiles[lang]);
    }

    if (!result && this.LanguageFiles[lang]) {
      result = this.loadLanguageFromFile(this.LanguageFiles[lang]);
    }

    if (result) {
      this.LoadedLanguage = lang;
    }
    return result;
  };

  //----------------------------------------------------------------------------
  this.loadLanguageFromFile = function (file) { // e.g. 'en-us.txt'
  //----------------------------------------------------------------------------
    Ti.API.debug('Loading language from file "' + file + '"');

    var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), this.LangDir, file);
    Ti.API.debug('Loading from file "' + f + '"');

    if (!f) {
      Ti.API.warn('Failed to open file "' + file + '"');
      return false; // failed to open file
    }
    var contents = f.read();
    if (!contents) {
      Ti.API.warn('Failed to read file "' + file + '"');
      return false; // failed to read file
    }
    f = null;
    contents = contents.text;
    if (!contents) {
      Ti.API.warn('Failed to convert file "' + file + '" contents to string');
      return false; // failed to convert file to string
    }
    if (!contents.match(this.FileSignature)) {
      Ti.API.warn('File "' + file + '" seems to have the wrong format');
      return false; // failed to understand the file contents
    }

    var result = false;
    var lines = contents.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var m = lines[i].match(/^(\w[\w\d\-\.:\/\\]*)=(.+)\r?$/);
      if (m) {
        result = true; // ok, at least one string matching the mask has been found
        var key = m[1];
        var value = m[2];
        if (this.LocalizedStrings[key]) {
          Ti.API.warn('Duplicate key "' + key + '" found in "' + file + '"');
        }
        value = value.replace(/\\\\/g, '\u0001');
        value = value.replace(/\\n/g, '\n');
        value = value.replace(/\u0001/g, '\\');
        this.LocalizedStrings[key] = value;
      }
    }

    this.LoadedLanguageFile = file;
    return result;
  };

  //----------------------------------------------------------------------------
  this.scanLocalizationFiles = function () {
  //----------------------------------------------------------------------------
    var dir = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), this.LangDir);
    var files = dir.getDirectoryListing();
  
    this.LanguageFiles = {};
    this.LanguageOverrideFiles = {};
    this.Languages = [];

    var lang = {};
    for (var i = 0; i < files.length; i++) {
      var m = files[i].match(/^(\w\w(-\w\w){0,1})(\.override){0,1}\.txt$/);
      if (m) {
        if (m[3]) { // if .override suffix is present
          this.LanguageOverrideFiles[m[1]] = files[i]; // add filename to overrdies list
        } else {
          this.LanguageFiles[m[1]] = files[i]; // add filename to languages list
        }
        lang[m[1]] = 1; // remember language
      }
    }

    // constructing the compound array of languages with no duplicates
    for (var key in lang) {
      if (true) { // to avoid warning message from Titanium compiler
        this.Languages.push(key);
      }
    }
  };

  //----------------------------------------------------------------------------
  this.getPreferredLanguage = function () {
  //----------------------------------------------------------------------------
    return Ti.App.Properties.getString(this.LangPreferenceName);
  };

  //----------------------------------------------------------------------------
  this.setPreferredLanguage = function (lang) { // e.g. 'en' or 'en-us'
  //----------------------------------------------------------------------------
    if (lang) {
      Ti.App.Properties.setString(this.LangPreferenceName, lang);
    } else {
      Ti.App.Properties.removeProperty(this.LangPreferenceName);
    }
  };

  // initialization code

  this.UserLanguage = this.getPreferredLanguage();
  if (!this.UserLanguage) {
    // as Titanium doesn't have a native method for checking user locale yet,
    // use webview to determine locale

    var webview = Ti.UI.createWebView();
    this.UserLanguage = webview.evalJS("window.navigator.language");

    Ti.API.debug('User language is: "' + this.UserLanguage + '"');
  } else {
    Ti.API.debug('Preferred language is: "' + this.UserLanguage + '"');
  }

  // uncomment this line to force a specific locale (for debugging)
  //this.UserLanguage = 'ru';

  this.scanLocalizationFiles();

  var result = // this is to avoid Titanium warning
    this.loadLanguage(this.UserLanguage) || // full language qualifier, e.g. 'en-us'
    this.loadLanguage(this.UserLanguage.split('-').shift()) || // short language qualifier, e.g. 'en'
    this.loadLanguage(this.DefaultLanguage) || // full language qualifier
    this.loadLanguage(this.DefaultLanguage.split('-').shift()); // short language qualifier
};

//------------------------------------------------------------------------------

var L10N = new L10NObject(); // global object

//------------------------------------------------------------------------------
function _(s, defaultString) {
//------------------------------------------------------------------------------
  return L10N.getLocalizedString(s, defaultString);
}
