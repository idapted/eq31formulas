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
var win_formulas = Titanium.UI.createWindow({ 
    title:_('eq_31_formulas'),
	// titleImage:'images/nav_icon_31f.png',
	barColor:'#385292', 
	//navBarHidden:true,
    backgroundColor:'#fff',
	url:"content/formulas_list.js"
});

var tab_formulas = Titanium.UI.createTab({  
    icon:'images/nav_icon_31f.png',
    title:_('tab_formulas'),
    window:win_formulas
});
