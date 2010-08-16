var db = Titanium.Database.open('eq31formulas');
var win = Titanium.UI.currentWindow;
win.barColor = '#385292';
// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{

	// get orienation from event object
	var orientation = getOrientation(e.orientation);
});

Titanium.API.info(win.type);

var rows = db.execute('SELECT * FROM TIPS WHERE CATEGORY =?', win.type);

Titanium.API.info('TIPS ROW COUNT = ' + rows.getRowCount());

var views = [];
var sounds = [];

for(var i=0; i<rows.rowCount; i++){
	var tipView = Ti.UI.createWebView();
	
	var sound = Titanium.Media.createSound({
		url:"../sound/" + rows.field(4)
	});
	
	Ti.API.info("A---" + rows.field(4));
	sounds[i] = sound;
	
	if (win.type == 'do'){
		tipView.html = '<html><head><link rel="stylesheet" type="text/css" href="../css/tips.css" /></head><body>' + rows.field(3) + '</body></html>';
	}else{
		tipView.html = '<html><head><link rel="stylesheet" type="text/css" href="../css/tips_dont.css" /></head><body>' + rows.field(3) + '</body></html>';
	};
	
	//
	// PLAY
	//
	var play = Titanium.UI.createButton({
		// title:'Play',
		height:30,
		width:105,
		right:100,
		bottom:15,
		backgroundImage:'../images/sound_play.png',
		index: i
	});

	play.addEventListener('click', function(e)
	{	
		Titanium.API.info('SOUNDS = ' + e.source.index );
		if (sounds[e.source.index].isPlaying()){
			sounds[e.source.index].pause();
			e.source.backgroundImage = '../images/sound_play.png';
			playing=true;
		}else{
			sounds[e.source.index].play();
			e.source.backgroundImage = '../images/sound_pause.png';
			playing=false;
		}	
	});
	
	tipView.add(play);
	
	views[i] = tipView;
	
	Titanium.API.info("index:" + rows.field(1));
	
	rows.next();
}
rows.close();
db.close();

var scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:true,
	pagingControlHeight:20,
	maxZoomScale:2.0,
	currentPage:0,
	showHorizontalScrollIndicator:true,
	animate:true
});

win.add(scrollView);

scrollView.addEventListener('scroll', function(e)
{
    activeView = e.view;  // the object handle to the view that is about to become visible
	Titanium.API.info("scroll called - current index " + e.currentPage + ' active view ' + activeView);
	
	if (e.currentPage > 0 && sounds[e.currentPage-1].isPlaying())
	{
		sounds[e.currentPage-1].pause();
	}
	
	if (sounds[e.currentPage+1].isPlaying())
	{
		sounds[e.currentPage+1].pause();
	}
});
