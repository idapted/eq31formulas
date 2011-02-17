/*
 * EQ31Formulas, mobile version of the 31 formulas book <http://www.31formulas.com/>.
 * Copyright (C) 2010-2011, Idapted Ltd. <http://www.idapted.com>
 *
 * Version: Apache License 2.0
 *
 * The content of this file is licensed under the Apache License, Version 2.0. (the "License").
 * You may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is EQ31Formulas.
 *
 * The Initial Developer of the Original Code is
 * Seven Du <seven@idapted.com>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Andy Wang <andy@eleutian.com>
 */

// Localization libs
Ti.include('l10n/l10n.js');
Ti.include('l10n/l10n_dialog.js');
Ti.include('l10n/l10n_format.js');

Ti.API.info("platform default lang: " + Titanium.Platform.locale);
Ti.API.info("multi lang setting: " + L10N.UserLanguage);

// Create table for first time users.
var db = Titanium.Database.install('31formulas.db', 'eq31formulas');
db.execute('CREATE TABLE IF NOT EXISTS LESSONS (ID INTEGER, TITLE TEXT, SOUND_NAME TEXT,AIMS TEXT, ANSWER_ORDER TEXT, LANG_STEP TEXT, MODEL_ANSWER TEXT)');
db.execute('CREATE TABLE IF NOT EXISTS TIPS (ID INTEGER, TITLE TEXT, CATEGORY TEXT, DETAIL TEXT, SOUND_NAME TEXT)');

Titanium.UI.setBackgroundColor('#000');

// synchronize db
Ti.include("synchronize.js");

Ti.include("init_layout.js");

// add top level introduction of 31 formulas
Ti.include("introduction.js");