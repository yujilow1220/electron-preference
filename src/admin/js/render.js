/**
DOMのトップに、選択中のtab情報を入れ込む。
sidebar → 該当するtabのnameを
contents → 該当するtabのitemsを
*/
var fs = require('fs');
const storage = require('electron-json-storage');
const remote = require('electron').remote;
const preference = remote.require('./preference.json');
const ClassNames = require('classnames');


var Sidebar = React.createClass({
  getInitialState: function(){return null},
  handleChange: function(){return null},
  render:function(){
    const current = this.props.current;
    const lists = preference.map(function(e,i){
      return <li className={ClassNames({current:(current == i)})}><a>{e.name}</a></li>
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

var Item = React.createClass({
  render:function(){
    return (
      <div className="col-md-12 panel-warning">
        <div className="content-box-header panel-heading">
          <div className="panel-title ">{this.props.item.name}</div>
        </div>
        <div className="content-box-large box-with-header">
          {this.props.item.description}
        </div>
      </div>
    )
  }
});

var Contents = React.createClass({
  render: function(){
    var items = this.props.items.map(function(item){
      return <Item item={item} />
    });
    return (
      <div>{items}</div>

    );
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
            <Sidebar current={this.props.current}/>
    		  </div>
    		  <div className="col-md-10">
    		  	<div className="row">
                <Contents items={preference[this.props.current].items} />
    		  	</div>
          </div>
        </div>
      </div>
    )
  }
});


// ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<Body current="0" />, document.getElementById('body'));
// ReactDOM.render(<Contents />, document.getElementById('contents'));
