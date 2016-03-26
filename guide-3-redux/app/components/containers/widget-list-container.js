import React from 'react';
import { connect } from 'react-redux';
import WidgetList from '../views/widget-list';
import * as widgetApi from '../../api/widget-api';
import store from '../../store';
import { loadSearchLayout } from '../../actions/search-layout-actions';

const WidgetListContainer = React.createClass({

  componentDidMount: function() {
    widgetApi.getList()
      .then((response) => {
        store.dispatch(loadSearchLayout('Widget Results', response.data.length))
      });
  },

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
