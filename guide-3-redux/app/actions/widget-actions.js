import * as types from '../actions/action-types';

export function widgetListSuccess(widgets) {
  return {
    type: types.WIDGET_LIST_SUCCESS,
    widgets
  };
}

export function deleteWidgetSuccess(widgetId) {
  return {
    type: types.DELETE_WIDGET_SUCCESS,
    widgetId
  };
}
