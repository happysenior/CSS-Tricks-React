import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import widgetReducer from './widget-reducer';

// Combine Reducers
var reducers = combineReducers({
    userState: userReducer,
    widgetState: widgetReducer
});

export default reducers;
