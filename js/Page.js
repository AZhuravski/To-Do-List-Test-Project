var React = require('react');

var Page = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },

  onDoubleClick: function(event) {
      // Clear the input
      this.setState({value: this.state.value}, function() {
        // This code executes after the component is re-rendered
        React.findDOMNode(this.refs.theInput2).focus();   // Boom! Focused!
      });
      this.props.onDoubleClick(event);
  },

  render: function() {

    var taskClass           = this.props.marked?  'taskIsDone'      : 'taskIsNotDone';
    var isTaskDoneIconClass = this.props.marked?  'taskIsDoneIcon'  : 'taskIsNotDoneIcon';
    var onCloseClass        = this.props.active?  'closeIcon'       : 'nonvisible';
    var showTaskNameClass   = this.props.edited?  'nonDisplayed'    : '';
    var editTaskNameClass   = this.props.edited?  'editTaskName'    : 'nonDisplayed'; 
    var shortTaskName       = (this.state.value.length > 17)? this.state.value.substr(0,16) + '...' : this.state.value;

    return (
      <div  className={taskClass}>

        <div className="dotted-line"></div>

        <table>
          <tr>

            <td className={isTaskDoneIconClass} onClick={this.props.onClick}></td>

            <td className="taskName">
              <span className={showTaskNameClass} onDoubleClick={this.onDoubleClick}>{shortTaskName}</span>
              <span className={editTaskNameClass}>                
                <form role='form' onSubmit={this.props.editPageName}>
                    <input type='text' onChange={this.props.handleChange2} value={this.state.value} ref="theInput2" />
                </form>
              </span>
            </td>

            <td data-style="delete-icon" className={onCloseClass} onClick={this.props.onClickClose}></td>

          </tr>
        </table>

      </div>
    );
  }
});

module.exports = Page;