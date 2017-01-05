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
          <div className="panel-title ">{this.props.item.text || this.props.item.name}</div>
        </div>
        <div className="content-box-large box-with-header">
          <p>{this.props.item.description}</p>
          <input value={this.props.val} checked={this.props.val} name={this.props.item.name} className={ClassNames({'form-control':(this.props.item.type !== 'checkbox')})} type={this.props.item.type} onChange={this.props.onChangedValue}/>
        </div>
      </div>
    )
  }
});

var Body = React.createClass({
  getInitialState: function(){
    return {
      current:0,
      app_preference:this.props.app_preference
    }
  },
  apply: function(){
    storage.set('config', this.state.app_preference, function(error){
      if (error) throw error;
      console.log("success");
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
    const items = this.props.tabs[this.state.current].items.map(function(item, i){
      const val = self.state.app_preference[self.props.tabs[self.state.current].name][item.name];
      return <Item val={val} item={item} key={i} onChangedValue={self.onChangedValue} />
    });
    return (
      <div className="page-content">
      	<div className="row">
    		  <div className="col-md-2">
            <Sidebar current={this.state.current} onClickTab={this.onClickTab}/>
            <button className="btn" onClick={this.apply}>apply</button>
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
storage.get('config', function (error, data) {
  if (error) throw error;
  ReactDOM.render(<Body app_preference={data} tabs={tabs}/>, document.getElementById('body'));
});
