/*
 * EQ31Formulas, mobile version of the 31 formulas book <http://www.31formulas.com>.
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
 * Andy Wang <andy@eleutian.com>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Seven Du <seven@idapted.com>
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create tab for tips
//
Ti.include('content/tab_tips.js');

Ti.include('content/tab_formulas.js');

if (L10N.UserLanguage == 'zh-cn' || L10N.UserLanguage == 'zh-tw')
{
	//
	// create tab for weibo
	//
	Ti.include('content/tab_weibo.js');
}

// create tab for lang settings
var win_setting = Ti.UI.createWindow({
    title:_('tab_settings')
});

var tab_setting = Ti.UI.createTab({  
    icon:'images/nav_icon_setting.png',
    title:_('tab_settings'),
    window:win_setting
});

var data = [];
var ACTION_LANGUAGE = 0;

var row = Ti.UI.createTableViewRow({
  title: _('language'),
  hasChild: true,
  action: ACTION_LANGUAGE,
  className: 'control'
});

var label_lang = Ti.UI.createLabel({
  textAlign: 'right',
  right: 10,
  width: 175,
  color: '#385487',
  font: {fontSize: 16},
  text: L10N.getLanguageDisplayName()
});

row.add(label_lang);

data.push(row);

// create table view

var tableview = Ti.UI.createTableView({
  data:data,
  style:Ti.UI.iPhone.TableViewStyle.GROUPED
});

// add table click listener

tableview.addEventListener('click', function(e) {
  var rowdata = e.rowData;
  if (rowdata.action == ACTION_LANGUAGE) {

    // show language selection dialog

    L10N.showLanguageSelectionDialog();
  }
});

win_setting.add(tableview);

//
//  add tabs
//
tabGroup.addTab(tab_formulas);  
tabGroup.addTab(tab_tips);  
if (L10N.UserLanguage == 'zh-cn' || L10N.UserLanguage == 'zh-tw')
{
	tabGroup.addTab(tab_weibo);
}
tabGroup.addTab(tab_setting);  

var omodes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

win_tips.orientationModes = omodes;

Titanium.Analytics.featureEvent('app.feature.blah',{product:'killer'});

tabGroup.setActiveTab(0);
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.NONE
});