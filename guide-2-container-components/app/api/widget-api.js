import axios from 'axios';

/**
 * Get widgets
 */

export function getWidgetList() {
  return axios.get('http://localhost:3001/widgets')
    .then(function(response) {
      return response.data;
    });
}

/**
 * Delete a widget
 */

export function deleteWidget(widgetId) {
  return axios.delete('http://localhost:3001/widgets/' + widgetId);
}
