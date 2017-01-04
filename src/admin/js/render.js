/**
DOMのトップに、選択中のtab情報を入れ込む。
sidebar → 該当するtabのnameを
contents → 該当するtabのitemsを
*/
var fs = require('fs');
const storage = require('electron-json-storage');
const remote = require('electron').remote;
const preference = remote.require('./preference.json');
var current = 0;



// var main = remote.require('./main');

var Sidebar = React.createClass({
  getInitialState: function(){return null},
  handleChange: function(){return null},
  render:function(){
    const lists = preference.map(function(e,i){
      return <li className=""><a>{e.name}</a></li>
    })
    return (
		  	<div className="sidebar content-box" style={{display: "block"}}>
          <ul className="nav">
              {lists}
          </ul>
        </div>
    );
  }
});

var Contents = React.createClass({
  render: function(){
    return (
      <div className="col-md-12 panel-warning">
        <div className="content-box-header panel-heading">
          <div className="panel-title ">name</div>

        <div className="panel-options">
          <a href="#" data-rel="collapse"><i className="glyphicon glyphicon-refresh"></i></a>
          <a href="#" data-rel="reload"><i className="glyphicon glyphicon-cog"></i></a>
        </div>
        </div>
        <div className="content-box-large box-with-header">
          This is content
        </div>
      </div>
    )
  }
})
var Body = React.createClass({
  propTypes:{
    current: React.PropTypes.number.isRequired
  },
  getInitialState: function(){return null},
  render: function(){
    return (
      <div className="page-content">
      	<div className="row">
    		  <div className="col-md-2">
            <Sidebar />
    		  </div>
    		  <div className="col-md-10">
    		  	<div className="row">
                <Contents />
    		  	</div>
          </div>
        </div>
      </div>
    )
  }
});


// ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<Body />, document.getElementById('body'));
// ReactDOM.render(<Contents />, document.getElementById('contents'));
