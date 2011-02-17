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
(function(){
	//var db = Titanium.Database.open('eq31formulas');
	
	if (Titanium.Network.online == true)
	{
		Titanium.API.info('Online--update lessons!');
		var src = 'http://www.eqenglish.com/eq31formulas/data_service/lessons';
		c = Titanium.Network.createHTTPClient();

		c.onload = function()
		{	
			var json_data = JSON.parse(this.responseText);
			lessons = db.execute('SELECT * FROM LESSONS');
				
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
					db.execute("INSERT INTO LESSONS (ID, TITLE, SOUND_NAME, AIMS, ANSWER_ORDER, LANG_STEP, MODEL_ANSWER) VALUES(?,?,?,?,?,?,?)", record.id, record.title, record.sound_name, record.aims, record.answer_order, record.lang_step, record.model_answer);	
				}
			}
			lessons.close();
		};

		// open the client
		c.open('GET', src);
		
		// send the data
		c.send();
		
		// Update tips..
		Titanium.API.info('Online--update Tips!');
		tips_src = 'http://www.eqenglish.com/eq31formulas/data_service/tips';
		c_tips = Titanium.Network.createHTTPClient();

		c_tips.onload = function()
		{	
			var json_tips = JSON.parse(this.responseText);
			tips = db.execute('SELECT * FROM TIPS');
			
			Titanium.API.info('tips JSON count:' + json_tips.length);
			Titanium.API.info('tips DB count:' + tips.rowCount);
			
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
			tips.close();		
		};
 
		// open the client
		c_tips.open('GET', tips_src);
		
		// send the data
		c_tips.send();
	}
	else
	{
		Titanium.API.info('Offline--');
		return;
	}
	setTimeout(function(){db.close();},3000);	
})();

