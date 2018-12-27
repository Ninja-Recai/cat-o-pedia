import { combineReducers } from 'redux';
import { cats } from 'reducers/cats';
import { form } from 'reducers/form';

export const rootReducer = combineReducers({
  cats,
  form,
});
