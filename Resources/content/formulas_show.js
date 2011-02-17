/*
 * EQ31Formulas, mobile version of the 31 formulas book <http://www.31formulas.com/cn/>.
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
Ti.include('../l10n/l10n.js');
Ti.include('../l10n/l10n_dialog.js');
Ti.include('../l10n/l10n_format.js');

var db = Titanium.Database.open('eq31formulas');
var win = Titanium.UI.currentWindow;
win.barColor = '#385292';

if (Ti.Platform.name == 'android') 
{ 
	Titanium.UI.currentWindow.backgroundColor = '#FFF';
}
else
{
	Titanium.UI.currentWindow.backgroundColor = '#FFF';
}

var row = db.execute('SELECT * FROM lessons WHERE id =?', win.id);

var views = [];
for(var i=3; i<7; i++){
	var fView = Ti.UI.createWebView();

	fView.html = '<html><head><link rel="stylesheet" type="text/css" href="../css/formula.css" /></head><body>' + row.field(i) + '</body></html>';
	
	if(i == 6 && row.field(2)){
		var play = Titanium.UI.createButton({
			height:30,
			width:135,
			right:20,
			bottom:15,
			backgroundImage:'../images/video_play.png',
			s_url: row.field(2)
		});
		
		fView.add(play);
		
		play.addEventListener('click', function(e)
		{
			var omodes = [
				Titanium.UI.PORTRAIT,
				Titanium.UI.UPSIDE_PORTRAIT,
				Titanium.UI.LANDSCAPE_LEFT,
				Titanium.UI.LANDSCAPE_RIGHT
			];

			win.orientationModes = omodes;
			
			var activeMovie = Titanium.Media.createVideoPlayer({
				url: _('animation_pre') + e.source.s_url,
				backgroundColor:'#111',
				mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
				fullscreen: true
			});
			
			if (parseFloat(Titanium.Platform.version) >= 3.2)
			{
				activeMovie.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_EMBEDDED;
				if (Titanium.Platform.osname == "ipad") {
					activeMovie.width = 400;
					activeMovie.height = 300;
				}
				fView.add(activeMovie);
			}
			activeMovie.play();
			activeMovie.addEventListener('load',function()
			{
				// animate label
				var t = Titanium.UI.create2DMatrix();
				t = t.scale(3);
				movieLabel.animate({transform:t, duration:500, color:'red'},function()
				{
					var t = Titanium.UI.create2DMatrix();
					movieLabel.animate({transform:t, duration:500, color:'white'});
				});
			});

			activeMovie.addEventListener('complete',function(e)
			{
				e.source.stop();
			});
		});
	}
	views.push(fView);
}

// close db after getting data
row.close();
db.close();

var scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:true,
	pagingControlHeight:20,
	maxZoomScale:2.0,
	currentPage:0,
	showHorizontalScrollIndicator:true
});

win.add(scrollView);

// scrollView.addEventListener('scroll', function(e)
// {
//     activeView = e.view;  // the object handle to the view that is about to become visible
// 	Titanium.API.info("scroll called - current index " + e.currentPage + ' active view ' + activeView);
// });

