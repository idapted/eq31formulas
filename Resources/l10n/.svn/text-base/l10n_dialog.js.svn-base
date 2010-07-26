/*

Titanium L10N framework - Language selection dialog

Copyright Igor Afanasyev <afan@mail.ru>

Version 1.0 - 2010-03-05

*/

//------------------------------------------------------------------------------
L10NObject.prototype.saveOverrideForCurrentLanguageFromUrl = function (url, callback) {
//------------------------------------------------------------------------------
  //Ti.API.debug('saveOverrideForCurrentLanguageFromUrl, url = "' + url + '"');
  var this_l10n = this;

  var c = Ti.Network.createHTTPClient();

  c.onerror = function() {
    //Ti.API.debug('c.onerror()');
    if (callback) {
      callback(false, 'Unable to load the document. Maybe server is down or you mistyped the URL?', url); // fail
    }
  };

  c.onload = function() {
    //Ti.API.debug('c.onload()');
    var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(),
                                  this_l10n.LangDir,
                                  this_l10n.LoadedLanguage + '.override.txt');

    if (!c.responseText.match(this_l10n.FileSignature)) {
      Ti.API.warn('Downloaded file has the wrong format');
      if (callback) {
        callback(false, 'Downloaded file has the wrong format. Probably you mistyped the URL?', url); // fail
      }
      return;
    }

    Ti.API.debug('Saving to file "' + f + '"');
    f.write(c.responseText);

    if (callback) {
      callback(true, c.statusText, url); // ok
    }
  };

  Ti.API.debug('Loading URL "' + url + '"');

  c.open('GET', url);
  c.send();
};

//------------------------------------------------------------------------------
L10NObject.prototype.deleteOverrideFiles = function () {
//------------------------------------------------------------------------------
  var result = false;
  for (var key in this.LanguageOverrideFiles) {
    if (true) { // to avoid warning message from Titanium compiler
      var file = this.LanguageOverrideFiles[key];

      var f = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), this.LangDir, file);
      Ti.API.debug('Deleting file "' + f + '"');
      if (f.deleteFile()) { result = true; }
    }
  }
  if (result) { // if at least one file was deleted
    this.scanLocalizationFiles(); // rescan the contents of the directory
  }
  return result;
};

//----------------------------------------------------------------------------
L10NObject.prototype.showLanguageSelectionDialog = function () {
//----------------------------------------------------------------------------
  var this_l10n = this;

  var ACTION_DELETE = 0;
  var ACTION_LOAD = 1;
  var ACTION_SELECT = 2;
  var RESTART_MESSAGE = 'Please restart the application for changes to take effect.';

  var new_lang;
  var app_restart_required; // will be true if 

  var win = Ti.UI.createWindow({
    title:'Language'
  });

  // spinner indicator (displayed when querying image from the server)

  var spinner = Ti.UI.createActivityIndicator({
    height: 50,
    width: 50,
    style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
  });

  // create and populate table view data object

  var data = [];

  var row = Ti.UI.createTableViewRow({
    title: 'Choose automatically',
    selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
    className: 'control'
  });
  var sw = Ti.UI.createSwitch({
    right: 7,
    value: !!!this_l10n.getPreferredLanguage()
  });
  
  row.add(sw);
  
  sw.addEventListener('change', function(e) {
    if (!!!this_l10n.getPreferredLanguage() != e.value) {
      app_restart_required = true;
      if (e.value) { // switched on
        this_l10n.setPreferredLanguage(false);
      } else { // switched off
        this_l10n.setPreferredLanguage(this_l10n.LoadedLanguage);
      }
    }
  });

  data.push(row);

  for (var i = 0; i < this.Languages.length; i++) {
    var l = this.Languages[i];
    var t = this_l10n.getLanguageDisplayName(l);
    //t = (this_l10n.LoadedLanguage == l) ? t + ' (current)' : t;
    data.push({
      title: t,
      lang: l,
      action: ACTION_SELECT,
      //hasCheck: !!this_l10n.getPreferredLanguage() && (this_l10n.LoadedLanguage == l)
      hasCheck: (this_l10n.LoadedLanguage == l)
    });
  }

  row = Ti.UI.createTableViewRow();
  var url = Ti.App.Properties.getString(this_l10n.LangUrlPreferenceName); // load url from preferences
  if (!url) { url = 'http://mydomain/ru.txt'; }
  var tf1 = Ti.UI.createTextField({
    height: 35,
    left: 10,
    width: 280,
    value: url,
    autocorrect: false,
    autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
    keyboardType: Ti.UI.KEYBOARD_URL,
    returnKeyType: Ti.UI.RETURNKEY_DONE,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE
  });	
  row.add(tf1);
  row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
  row.className = 'control';
  row.header = 'Testing localizations:';
  data.push(row);

  data.push({
    title:'Load override for "' + this_l10n.LoadedLanguage + '" locale',
    action: ACTION_LOAD/*,
    header: 'Testing localizations:'*/
  });

  i = 0; for (var key in this_l10n.LanguageOverrideFiles) { if (true) { i++; } }
  if (i > 0) {
    data.push({title:'Delete override files (' + i + ')', action: ACTION_DELETE});
  }

  // create table view
  var tableview = Ti.UI.createTableView({
    data:data,
    style:Ti.UI.iPhone.TableViewStyle.GROUPED
  });

  // create table view event listener
  tableview.addEventListener('click', function(e) {
    var rowdata = e.rowData;

    if (rowdata.action == ACTION_DELETE) { // delete override files
      if (this_l10n.deleteOverrideFiles()) {
        tableview.deleteRow(e.index);
        app_restart_required = true;
      } else {
        Ti.UI.createAlertDialog({
           title:'No Files Deleted',
           message:'No files were deleted. Something possibly went wrong.'
        }).show();
      }
    } else if (rowdata.action == ACTION_LOAD) { // load override file
      spinner.show();
      Ti.App.Properties.setString(this_l10n.LangUrlPreferenceName, tf1.value); // save url to preferences
      this_l10n.saveOverrideForCurrentLanguageFromUrl(tf1.value, function(success, error_message, url) {
        spinner.hide();
        if (success) {
          app_restart_required = true;
          Ti.UI.createAlertDialog({
             title:'File Loaded',
             message:'File loaded successfully. ' + RESTART_MESSAGE
          }).show();
        } else {
          Ti.UI.createAlertDialog({
             title:'Error',
             message:error_message
          }).show();
        }
      });
    } else if (rowdata.action == ACTION_SELECT) { // select language
      this_l10n.setPreferredLanguage(rowdata.lang);

      sw.value = false; // turn off 'Auto' switch

      // reset checks
      for (var i = 0; i < e.section.rows.length; i++) {
        e.section.rows[i].hasCheck = false;
      }
      e.section.rows[e.index].hasCheck = true;

      new_lang = rowdata.lang;
      app_restart_required = true;
    }
  });

  win.add(tableview);

  win.add(spinner);

  // create a button to close window
  var b = Ti.UI.createButton({
    title:'Close',
    style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
  });
  win.setRightNavButton(b);

  b.addEventListener('click', function() {
    if (app_restart_required) {
      if (new_lang) {
        Ti.UI.createAlertDialog({
           title:'Language Selected',
           message:'"' + this_l10n.getLanguageDisplayName(new_lang) +
                   '" is now a preferred language. ' + RESTART_MESSAGE
        }).show();
      } else {
        Ti.UI.createAlertDialog({
           title:'Configuration Changed',
           message: RESTART_MESSAGE
        }).show();
      }
    }

    win.close();
  });

  win.open({modal:true});
};
