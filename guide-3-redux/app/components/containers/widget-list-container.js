import React from 'react';
import { connect } from 'react-redux';
import WidgetList from '../views/widget-list';
import * as widgetApi from '../../api/widget-api';

const WidgetListContainer = React.createClass({

  componentDidMount: widgetApi.getList,

  render: function() {
    return (
      <WidgetList widgets={this.props.widgets} deleteWidget={widgetApi.deleteWidget} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    widgets: store.widgetState.widgets
  };
};

export default connect(mapStateToProps)(WidgetListContainer);
