// Localization libs
Ti.include('l10n/l10n.js');
Ti.include('l10n/l10n_dialog.js');
Ti.include('l10n/l10n_format.js');

// Create table for first time users.
var db = Titanium.Database.install('31formulas.db', 'eq31formulas');
db.execute('CREATE TABLE IF NOT EXISTS LESSONS (ID INTEGER, TITLE TEXT, AIMS TEXT, ANSWER_ORDER TEXT, LANG_STEP TEXT, MODEL_ANSWER TEXT)');
db.execute('CREATE TABLE IF NOT EXISTS TIPS (ID INTEGER, TITLE TEXT, CATEGORY TEXT, DETAIL TEXT, SOUND_NAME TEXT)');

Titanium.UI.setBackgroundColor('#000');

// synchronize db
Ti.include("synchronize.js");

Ti.include("init_layout.js");

// add top level introduction of 31 formulas
Ti.include("introduction.js");