const electron = require('electron');
const storage = require('electron-json-storage');
const fs = require('fs');
const {Menu, app, BrowserWindow} = require('electron');
var tabs;
module.exports = {
  load: function(conf_path){
    tabs = JSON.parse(fs.readFileSync(conf_path, 'utf8'));
    storage.get('config', function (error, data) {
        if (error) throw error;
        if (Object.keys(data).length === 0) {
            init_default_conf(tabs);
        }
    });
  },
  show: function(){
    const mainWindow = new BrowserWindow({width: 1200, height: 800});
    mainWindow.loadURL('file://' + __dirname + '/src/admin/index.html');
  },
  get: function(callback){
    storage.get('config', function (error, data) {
        if (error) throw error;
        if (Object.keys(data).length === 0) {
          init_default_conf(tabs)
          callback(tabs);
        }else{
            callback(data);
        }
    });
  }
}

function init_default_conf(tabs){
  storage.set('config', tabs, function(error){
    if (error) throw error;
  });
}
