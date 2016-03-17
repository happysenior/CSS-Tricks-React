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
    getWidgetList().then(widgets => {
      this.setState({widgets: widgets})
    });
  },

  deleteWidget: function(widgetId) {
    deleteWidget(widgetId).then(() => {
      this.refreshWidgetList();
    });
  },

  render: function() {
    return (
      <WidgetList widgets={this.state.widgets} deleteWidget={this.deleteWidget} />
    );
  }

});

export default WidgetListContainer;
