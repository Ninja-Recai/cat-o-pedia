import { createReducer } from 'zeal-redux-utils';
import { ActionTypeCat } from 'actions/constants';
import * as R from 'ramda';

const initialState = {
  isFetching: false,
  isFetched: false,
  errorMessage: '',
  successMessage: '',
  fetchReply: {},
};

export const cats = createReducer(initialState, {
  [ActionTypeCat.ADD_CAT_FETCH]: state => R.assoc('isFetching', true, state),
  [ActionTypeCat.ADD_CAT_FETCHED]: (state, action) => {
    if (action.payload.error) {
      return R.merge(state, {
        fetchReply: action.payload,
        errorMessage: action.payload.message,
        successMessage: '',
        isFetching: false,
        isFetched: false,
      });
    }
    return R.merge(state, {
      fetchReply: action.payload,
      isFetching: false,
      isFetched: true,
      successMessage: action.payload.message,
      errorMessage: '',
    });
  },
  [ActionTypeCat.ADD_CAT_FINISHED]: state => R.assoc('isFetched', true, state),
});
