var React = require('react');

var Page = require('./Page');

var PageList = React.createClass({

  getInitialState: function() {
    return {
      pages: [,],
      inputValue: '',
      inputValue2: '',
      addActive: false,
      menuItem: 'all'
    };
  },

  addPage: function() {
    var pages = this.state.pages;

    pages.unshift({
      value: this.state.inputValue,
      marked: false,
      edited: false
    });

    this.setState({
      pages: pages,
      inputValue: '',
      addActive: false
    });

    // Return false for form
    return false;
  },

  handleChange: function(event) {    
    this.setState({
      inputValue: event.target.value
    });
  },

  handleChange2: function(index, event) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    page.value = event.target.value;

    this.state.pages.splice(index, 1, page); 

    this.setState({
      inputValue2: event.target.value,
      pages: pages
    });
  },

  removePage: function(index) {
    var pages = this.state.pages;

    pages.splice(index, 1); 

    this.setState({
      pages: pages
    });
  },

  mark: function (index, event) {
    var pages = this.state.pages;
    var page = this.state.pages[index];
    var target = event.target;

    page.marked = !page.marked;
    pages.splice(index, 1, page); 

    this.setState({
      pages: pages
    });
  },

  edit: function (index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];

    page.edited = true;
    pages.splice(index, 1, page);  

    this.setState({
      pages: pages
    });
  },

  onClickAdd: function () {
    this.setState({
      addActive: true
    });

    this.setState({value: ''}, function() {
      React.findDOMNode(this.refs.theInput).focus();
    });
  },

  editPageName: function (index) {
    var pages = this.state.pages;
    var page = this.state.pages[index];

    page.value = this.state.inputValue2? this.state.inputValue2 : page.value;
    page.edited = false;
    pages.splice(index, 1, page);

    this.setState({
      pages: pages,
      inputValue2: ''
    });

    // Return false for form
    return false;
  },

  onClickMenu: function (event) {
    var target = event.target;
    var action = target.getAttribute('data-action');

    this.all = function() {
      this.setState({
        menuItem: 'all'
      });
    };
    this.active = function() {
      this.setState({
        menuItem: 'active'
      });
    };
    this.completed = function() {
      this.setState({
        menuItem: 'completed'
      });
    };

    if (action) { 
      this[action](); 
    }
  },

  render: function() {

    var tasksLeftCounter = 0;
    var tasksCompletedCounter = 0;

    this.state.pages.forEach(function(page, index) {
      if (page.marked) {
        tasksCompletedCounter++;
      } else {
        tasksLeftCounter++;
      }
    })

    var pages = this.state.pages.map(function(page, index) {
      if ((this.state.menuItem == 'all') || 
          (this.state.menuItem == 'active' && !page.marked) || 
          (this.state.menuItem == 'completed' && page.marked)) {
            return (
              <Page
              key={index}
              value={page.value}
              marked={page.marked}
              edited={page.edited}
              onClickClose={this.removePage.bind(this, index)} 
              onClick={this.mark.bind(this, index)}
              onDoubleClick={this.edit.bind(this, index)}
              handleChange2={this.handleChange2.bind(this, index)}
              editPageName={this.editPageName.bind(this, index)} /> );
      } else {
        return;
      }
    }.bind(this));

    var addTaskFormClass = this.state.addActive? 'addTaskForm' : 'nonDisplayed';

    var addTaskInitialButtonClass = this.state.addActive? 'nonDisplayed' : 'addTask';

    var naviClass = (this.state.pages.length-1)? 'navi' : 'shaddowBottom';

    var menuItemAllClass = '';
    var menuItemActiveClass = '';
    var menuItemCompletedClass = '';

    switch(this.state.menuItem){
      case 'all'      : menuItemAllClass = 'menuItemAll'; break;
      case 'active'   : menuItemActiveClass = 'menuItemActive'; break;
      case 'completed': menuItemCompletedClass = 'menuItemCompleted'; break;
    }

    return (
        <div id='container'>

          <div id="title"></div>
          
          <form className={addTaskFormClass} role='form' onSubmit={this.addPage}>
            <div className='addTaskInitialButtonClass'>
              <input type='text' value={this.state.inputValue}
                onChange={this.handleChange}
                className=''
                placeholder='What needs to be done?'
                ref="theInput"
              />
            </div>
          </form>
          <div className={addTaskInitialButtonClass} onClick={this.onClickAdd}>
            What needs to be done?
          </div>

          {pages}

          <div className={naviClass}>
            <span className='itemsLeft'>{tasksLeftCounter} items left</span>
            <span className='itemsMenu' onClick={this.onClickMenu}>
              <span className={menuItemAllClass} data-action="all">all</span> | <span className={menuItemActiveClass} data-action="active">active</span> | <span className={menuItemCompletedClass} data-action="completed">completed</span>
            </span>
            <span className='itemsCompleted'>{tasksCompletedCounter} completed</span>
          </div>

        </div>
    );
  }
});

module.exports = PageList;