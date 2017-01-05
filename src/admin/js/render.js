/**
DOMのトップに、選択中のtab情報を入れ込む。
sidebar → 該当するtabのnameを
contents → 該当するtabのitemsを
*/
var fs = require('fs');
const storage = require('electron-json-storage');
const remote = require('electron').remote;
const tabs = remote.require('./preference.json');
const ClassNames = require('classnames');


var Sidebar = React.createClass({
  render:function(){
    const current = this.props.current;
    const self = this;
    const lists = tabs.map(function(e,i){
      return(
        <li key={i} data-position={i} className={ClassNames({current:(current == i)})} onClick={self.props.onClickTab}>
          <a href="#">{e.name}</a>
        </li>
      )
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
          {this.props.item.description}<br />
          <input name={this.props.item.name} className={this.props.item.type} type={this.props.item.type} onChange={this.props.onChangedValue}/>
        </div>
      </div>
    )
  }
});

var Body = React.createClass({
  getInitialState: function(){
    return {
      current:0,
      app_preference:{}
    }
  },
  componentDidMount: function(){
    const self = this;
    storage.get('config', function (error, data) {
      if (error) throw error;
      self.setState({
        app_preference: data
      });
    });
	},
  onClickTab: function(key){
    this.setState({
      current:key.currentTarget.getAttribute('data-position')
    });
  },
  onChangedValue: function(e) {
    const tabName = tabs[this.state.current].name;
    var val = null;
    switch(e.target.type){
      case "checkbox":
        console.log(e.target.checked);
        val = e.target.checked;
        break;

      default:
        val = e.target.value;
    }
    var current_preference = this.state.app_preference;
    current_preference[tabName][e.target.name] = val;
    this.setState({
      preference: current_preference
    });
  },
  render: function(){
    const self = this;
    const items = tabs[this.state.current].items.map(function(item, i){
      return <Item item={item} key={i} onChangedValue={self.onChangedValue} />
    });
    return (
      <div className="page-content">
      	<div className="row">
    		  <div className="col-md-2">
            <Sidebar current={this.state.current} onClickTab={this.onClickTab}/>
    		  </div>
    		  <div className="col-md-10">
    		  	<div className="row">
                {items}
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
