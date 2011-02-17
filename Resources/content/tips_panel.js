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
 * Seven Du <seven@idapted.com>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Andy Wang <andy@eleutian.com>
 */
// Localization libs
Ti.include('../l10n/l10n.js');
Ti.include('../l10n/l10n_dialog.js');
Ti.include('../l10n/l10n_format.js');

var win = Titanium.UI.currentWindow;
win.backgroundImage='../images/tips_bg.png';
win.barColor = '#385292';

//
// NAVBAR
// 
var intro = Titanium.UI.createButtonBar({
	labels:[_('intro')],
	backgroundColor:'#336699'
});

win.setRightNavButton(intro);

intro.addEventListener('click', function(e)
{
	// window container
	var introWindow = Titanium.UI.createWindow({
		fullcreen:true,
		backgroundImage:'../images/' + _("img_fix") + '_tips_intro.png'
	});
	
	introWindow.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
	
	introWindow.addEventListener('click', function()
	{
		introWindow.close({
			transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
		});
	});
});

var tableView;
var data =[];

var section = Ti.UI.createTableViewSection();
data.push(section);

// ROW 1
var row1 = Ti.UI.createTableViewRow();
	row1.backgroundColor = 'transparent';
	row1.selectedBackgroundColor = 'transparent';
	row1.height = 182;
	row1.url = "tips_show.js";
	row1.type = 'do';
	var button1 = Ti.UI.createButton({
		backgroundImage:'../images/tips_btn_dos.png',
		top:80,
		left:0,
		width:320,
		height:80,
		clickName:'button'
	});
row1.add(button1);

section.add(row1);

// ROW 2
var row2 = Ti.UI.createTableViewRow();
	row2.backgroundColor = 'transparent';
	row2.selectedBackgroundColor = 'transparent';
	row2.height = 182;
	row2.url = "tips_show.js";
	row2.type = 'dont';
	var button2 = Ti.UI.createButton({
		backgroundImage:'../images/tips_btn_donts.png',
		top:40,
		left:0,
		width:320,
		height:80,
		clickName:'button'
	});
row2.add(button2);

section.add(row2);


tableView = Titanium.UI.createTableView({
	data:data,
	backgroundColor:'transparent',
	separatorColor:'transparent'
});


tableView.addEventListener('click', function(e)
{
	Ti.API.info('table view row clicked - source ' + e.source.clickName);
	// use rowNum property on object to get row number
	if (e.rowData.url && (e.source.clickName == 'button'))
	{
		var _title;
		if (e.rowData.type == 'do') {
			_title = "DO's";
		}
		else {
			_title = "DON'Ts";
		};
		var win = Titanium.UI.createWindow({
			url:e.rowData.url,
			// titleImage:'../images/nav_icon_tips.png',
			// title:_('tips'),
			title: _title,
			subject: e.rowData.title,
			type: e.rowData.type
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

win.add(tableView);