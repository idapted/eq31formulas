/*
 * EQ31Formulas, mobile version of the 31 formula book <http://www.31formulas.com>.
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
var win_tips = Titanium.UI.createWindow({
	title:_('tips'),
	// titleImage:'images/nav_icon_tips.png',
    // navBarHidden:true,
    backgroundColor:'#fff',
	url:"content/tips_panel.js"
});



var tab_tips = Titanium.UI.createTab({  
    icon:'images/nav_icon_tips.png',
    title:_('tab_tips'),
    window:win_tips
});