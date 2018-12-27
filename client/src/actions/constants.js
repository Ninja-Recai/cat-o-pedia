import { createActionTypes } from 'zeal-redux-utils';
import { postfixActions } from 'utils/actions/postfix-actions';

const fetchActions = postfixActions(['FETCH', 'FETCHED', 'FINISHED']);

export const ActionTypeCat = createActionTypes('cats', [
  'ADD_CAT',
  ...fetchActions('ADD_CAT'),
]);

export const ActionTypeForm = createActionTypes('form', ['UPDATE_FIELD']);
