import axios from 'axios';
import store from '../store';
import { widgetListSuccess, deleteWidgetSuccess } from '../actions/widget-actions';

/**
 * Get widgets
 */

export function getList() {
  return axios.get('http://localhost:3001/widgets')
    .then(response => {
      store.dispatch(widgetListSuccess(response.data));
      return response;
    });
}

/**
 * Delete a widget
 */

export function deleteWidget(widgetId) {
  return axios.delete('http://localhost:3001/widgets/' + widgetId)
    .then(response => {
      store.dispatch(deleteWidgetSuccess(widgetId));
      return response;
    });
}
