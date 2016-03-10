import React from 'react';
import WidgetList from '../views/widget-list';
import { getWidgetList, deleteWidget } from '../../api/widget-api';

const WidgetListContainer = React.createClass({

  getInitialState: function() {
    return {
      widgets: []
    }
  },

  componentWillMount: function() {
    this.refreshWidgetList();
  },

  refreshWidgetList: function() {
    const _this = this;
    getWidgetList().then(function(widgets) {
      _this.setState({widgets: widgets})
    });
  },

  deleteWidget: function(widgetId) {
    const _this = this;
    deleteWidget(widgetId).then(function() {
      _this.refreshWidgetList();
    });
  },

  render: function() {
    return (
      <WidgetList widgets={this.state.widgets} deleteWidget={this.deleteWidget} />
    );
  }

});

export default WidgetListContainer;
