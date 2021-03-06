import { createActionTypes } from 'zeal-redux-utils';
import { postfixActions } from 'utils/actions/postfix-actions';

const fetchActions = postfixActions(['FETCH', 'FETCHED', 'FINISHED']);

export const ActionTypeCat = createActionTypes('cats', [
  'ADD_CAT',
  ...fetchActions('ADD_CAT'),
  'GET_CATS',
  ...fetchActions('GET_CATS'),
  'GET_SINGLE_CAT',
  ...fetchActions('GET_SINGLE_CAT'),
  'ADD_LIKE',
  ...fetchActions('ADD_LIKE'),
  'CLEAR_CAT',
]);

export const ActionTypeForm = createActionTypes('form', [
  'UPDATE_FIELD',
  'RESET_FORM',
]);
