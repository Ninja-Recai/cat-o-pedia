import { createReducer } from 'zeal-redux-utils';
import { ActionTypeCat } from 'actions/constants';
import * as R from 'ramda';

const initialState = {
  isFetching: false,
  isFetched: false,
  errorMessage: '',
  successMessage: '',
  fetchReply: {},
  cats: [
    {
      imgUri: 'https://i.chzbgr.com/full/9013910528/hAB49129F/',
      title: 'Evil cat with wöter',
      desc: 'I nöck de wöter',
    },
  ],
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

  [ActionTypeCat.GET_CATS_FETCH]: state => R.assoc('isFetching', true, state),
  [ActionTypeCat.GET_CATS_FETCHED]: (state, action) => {
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
      cats: action.payload,
    });
  },
  [ActionTypeCat.GET_CATS_FINISHED]: state => R.assoc('isFetched', true, state),
});
