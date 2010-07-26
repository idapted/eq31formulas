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
for(var i=2; i<6; i++){
	var fView = Ti.UI.createWebView();

	fView.html = '<html><head><link rel="stylesheet" type="text/css" href="../css/formula.css" /></head><body>' + row.field(i) + '</body></html>';
	
	if(i == 5){
		var play = Titanium.UI.createButton({
			height:30,
			width:135,
			right:20,
			bottom:15,
			backgroundImage:'../images/video_play.png'
		});
		
		fView.add(play);
		
		play.addEventListener('click', function()
		{
			var activeMovie = Titanium.Media.createVideoPlayer({
				contentURL:'../animation/1.mp4', //'../animation/' + row.field(2)
				backgroundColor:'#111',
				movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
			});

			if (parseFloat(Titanium.Platform.version) >= 3.2)
			{
				activeMovie.movieControlStyle = Titanium.Media.VIDEO_CONTROL_EMBEDDED;
			//	activeMovie.movieControlStyle = Titanium.Media.VIDEO_CONTROL_FULLSCREEN;
			//	activeMovie.movieControlStyle = Titanium.Media.VIDEO_CONTROL_NONE;
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

			activeMovie.addEventListener('complete',function()
			{
				activeMoive.close();
			});
		});
	}
	views.push(fView);
}

// close db after getting data
row.close();

var scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:true,
	pagingControlHeight:20,
	maxZoomScale:2.0,
	currentPage:0,
	showHorizontalScrollIndicator:true
});

win.add(scrollView);

scrollView.addEventListener('scroll', function(e)
{
    activeView = e.view;  // the object handle to the view that is about to become visible
	Titanium.API.info("scroll called - current index " + e.currentPage + ' active view ' + activeView);
});

