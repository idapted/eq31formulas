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

//
// general introduction of EQ 31 Formulas.
//
 
(function()
{	
	// window container
	var welcomeWindow = Titanium.UI.createWindow({
		fullcreen:true,
		backgroundImage:'images/' + _('img_fix') + '_splash.png'
	});
	
	var actInd = Titanium.UI.createActivityIndicator({
		bottom:100, 
		height:50,
		width:10,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});
	welcomeWindow.add(actInd);
	
	var start = Titanium.UI.createLabel({
		text: _('loading_message'),
		font:{fontSize:20,fontWeight:'bold', fontFamily:'Helvetica'},
		color:'#fff',
		textAlign:'center',
		shadowColor:'#000',
		shadowOffset:{x:0,y:1},
		height:50,
		width:320,
		bottom:100
	});

	welcomeWindow.add(start);
	start.hide();
	
	welcomeWindow.open();
	
	welcomeWindow.addEventListener('open', function(){
		actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
		actInd.font = {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'};
		actInd.color = 'white';
		actInd.message = _('loading');
		actInd.width = 210;
		actInd.show();
		setTimeout(function()
		{
			actInd.hide();
			start.show();
		},3000);
	});
	
	welcomeWindow.addEventListener('click', function()
	{
		// Titanium.UI.createAlertDialog({title:'Image View', message:'You clicked me!'}).show();
		welcomeWindow.close({
			transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
		});
	});
	
})();

