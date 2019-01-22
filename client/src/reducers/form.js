import * as R from 'ramda';
import { createReducer } from 'zeal-redux-utils';
import { ActionTypeForm } from 'actions/constants';

const initialState = {
  formData: {
    imgUri: '',
    title: '',
    desc: '',
  },
};

export const form = createReducer(initialState, {
  [ActionTypeForm.UPDATE_FIELD]: (state, action) =>
    R.assocPath(
      ['formData', action.payload.fieldName],
      action.payload.value,
      state
    ),

  [ActionTypeForm.RESET_FORM]: (state, action) =>
    R.assoc(
      'formData',
      {
        imgUri: '',
        title: '',
        desc: '',
      },
      state
    ),
});
