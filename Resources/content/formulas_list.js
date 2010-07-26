// var db = Titanium.Database.install('../eq31formulas.db', 'eq31formulas');
var db = Titanium.Database.open('eq31formulas');

var rows = db.execute('SELECT * FROM lessons');

Titanium.API.info('ROW COUNT = ' + rows.getRowCount());

var win = Titanium.UI.currentWindow;
win.barColor = '#385292';

//
// NAVBAR
// 
var intro = Titanium.UI.createButtonBar({
	labels:['intro'],
	backgroundColor:'#336699'
});

win.setRightNavButton(intro);

intro.addEventListener('click', function(e)
{
	// window container
	var introWindow = Titanium.UI.createWindow({
		fullcreen:true,
		backgroundImage:'../images/f_part1_intro.png'
	});
	
	introWindow.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
	
	introWindow.addEventListener('click', function()
	{
		// Titanium.UI.createAlertDialog({title:'Image View', message:'You clicked me!'}).show();
		introWindow.close({
			transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
		});
	});
});

//
// CREATE SEARCH BAR
//
var search = Titanium.UI.createSearchBar({
	barColor:'#385292', 
	showCancel:false
});

search.addEventListener('change', function(e)
{
   e.value; // search string as user types
});
search.addEventListener('return', function(e)
{
   search.blur();
});
search.addEventListener('cancel', function(e)
{
   search.blur();
});

var tableView;
var data = [];

// create a var to track the active row
var currentRow = null;
var currentRowIndex = null;

// create the rest of the rows
for (var c=0;c<rows.rowCount;c++)
{
	var row = Ti.UI.createTableViewRow();
	row.backgroundImage = '../images/row_bg.png';
	row.selectedBackgroundImage = '../images/row_bg_selected.png';
	row.height = 90;
	row.url = "formulas_show.js";
	row.id = rows.field(0);
	row.className = 'datarow';
	row.filter = rows.field(1);
	row.clickName = 'row';

	var photo = Ti.UI.createView({
		backgroundImage:'../images/row_formula.png',
		top:15,
		left:10,
		width:60,
		height:60,
		borderRadius:10,
		clickName:'photo'
	});
	row.add(photo);
	
	var formula = Ti.UI.createLabel({
		color:'#222981',
		font:{fontSize:25,fontWeight:'bold', fontFamily:'Helvetica'},
		left:15,
		top:24,
		height:30,
		width:50,
		innerShadowColor:'#000',
		innerShadowOffset:{x:1,y:1},
		textAlign:'center',
		clickName:'formula',
		text:c + 1
	});

	row.add(formula);

	var fontSize = 16;
	if (Titanium.Platform.name == 'android') {
		fontSize = 14;
	}
	var aims = Ti.UI.createLabel({
		color:'#000',
		font:{fontSize:fontSize,fontWeight:'normal', fontFamily:'Helvetica'},
		left:80,
		top:0,
		width:200,
		shadowColor:'#eeeef0',
		shadowOffset:{x:0,y:1},
		clickName:'aims',
		text:rows.field(1)
	});

	row.add(aims);

	var button = Ti.UI.createView({
		backgroundImage:'../images/row_arrow.png',
		top:35,
		right:15,
		width:15,
		clickName:'button',
		height:25
	});
	row.add(button);
	
    data.push(row);

    rows.next();
}


//
// create table view (
//
tableView = Titanium.UI.createTableView({
	data:data,
	search:search,
	filterAttribute:'filter',
	backgroundColor:'white',
	separatorColor:'#9e9da2'
});

tableView.addEventListener('click', function(e)
{
	Ti.API.info('table view row clicked - source ' + e.source.clickName);
	Ti.API.info('table view row clicked - Mode: ' + e.searchMode);
	// use rowNum property on object to get row number
	if (e.rowData.url) //&& (e.source.clickName == 'button' || e.source.clickName == 'photo' || e.source.clickName == 'formula' || e.source.clickName == 'aims'))
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.url,
			// title: "Formula " + e.rowData.id,
			titleImage:'images/nav_icon_31f.png',
			subject: e.rowData.title,
			id: e.rowData.id
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

win.add(tableView);