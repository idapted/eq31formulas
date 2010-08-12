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