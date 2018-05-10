import { combineReducers } from 'redux';

import entitiesReducer from './entities_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import uiReducer from './ui_reducer';

const obj = {
  entities: entitiesReducer,
  session: sessionReducer,
  ui: uiReducer,
  errors: errorsReducer
};

export const rootReducer = combineReducers(obj);
