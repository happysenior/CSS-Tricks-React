import React from 'react';
import WidgetList from '../views/widget-list';
import * as widgetApi from '../../api/widget-api';

const WidgetListContainer = React.createClass({

  getInitialState: function() {
    return {
      widgets: []
    }
  },

  componentDidMount: function() {
    this.refreshWidgetList();
  },

  refreshWidgetList: function() {
    widgetApi.getList().then(widgets => {
      this.setState({widgets: widgets})
    });
  },

  deleteWidget: function(widgetId) {
    widgetApi.deleteWidget(widgetId).then(() => {
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
