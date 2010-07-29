(function(){
	var db = Titanium.Database.open('eq31formulas');
	
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	
	Titanium.API.info('JS TIME:' + currentTime);
	// lesson = db.execute('SELECT * FROM LESSONS ORDER BY ID LIMIT 1')
	
	lessons = db.execute('SELECT * FROM LESSONS');
	
	if (Titanium.Network.online == true)
	{
		Titanium.API.info('Online--update lessons!');
		var src = 'http://www.veecue.com/eq31formulas/data_service/lessons';
		c = Titanium.Network.createHTTPClient();

		c.onload = function()
		{	
			var json_data = JSON.parse(this.responseText);
			
			Titanium.API.info('lesson JSON count:' + json_data.length);
			Titanium.API.info('lessons DB count:' + lessons.rowCount);
			
			if (lessons.rowCount < json_data.length)
			{
				// db.execute('CREATE TABLE IF NOT EXISTS LESSONS (ID INTEGER, TITLE TEXT, AIMS TEXT, ANSWER_ORDER TEXT, LANG_STEP TEXT, MODEL_ANSWER TEXT)');
				db.execute('DELETE FROM LESSONS');
			
				for(var i=0; i<json_data.length; i++)
				{
					Titanium.API.info("updating lesson:" + i);
					var record = json_data[i].lesson;
					// add different control for UPDATE or INSERTION here
					db.execute("INSERT INTO LESSONS (ID, TITLE, AIMS, ANSWER_ORDER, LANG_STEP, MODEL_ANSWER) VALUES(?,?,?,?,?,?)", record.id, record.title, record.aims, record.answer_order, record.lang_step, record.model_answer);	
				}
			}
		};
 
		// open the client
		c.open('GET', src);
		
		// send the data
		c.send();
		
		// Update tips..
		Titanium.API.info('Online--update Tips!');
		src = 'http://www.veecue.com/eq31formulas/data_service/tips';
		c_tips = Titanium.Network.createHTTPClient();

		c_tips.onload = function()
		{	
			var json_tips = JSON.parse(this.responseText);
			
			Titanium.API.info('tips JSON count:' + json_tips.length);
			Titanium.API.info('tips DB count:' + tips.rowCount);
			tips = db.execute('SELECT * FROM TIPS');
			
			if (tips.rowCount < json_tips.length)
			{
				//db.execute('CREATE TABLE IF NOT EXISTS TIPS (ID INTEGER, TITLE TEXT, CATEGORY TEXT, DETAIL TEXT, SOUND_NAME TEXT)');
				db.execute('DELETE FROM TIPS');

				for(var i=0; i<json_tips.length; i++)
				{
					Titanium.API.info("updating tip:" + i);
					var record = json_tips[i].tip;
					// add different control for UPDATE or INSERTION here
					db.execute("INSERT INTO TIPS (ID, TITLE, CATEGORY, DETAIL, SOUND_NAME) VALUES(?,?,?,?,?)", record.id, record.title, record.category, record.detail, record.sound_name);	
				}	
			}			
		};
 
		// open the client
		c_tips.open('GET', src);
		
		// send the data
		c_tips.send();
	}
	else
	{
		Titanium.API.info('Offline--');
		return;
	}  	
})();

