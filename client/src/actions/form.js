import { ActionTypeForm } from 'actions/constants';

export const updateField = payload => ({
  type: ActionTypeForm.UPDATE_FIELD,
  payload,
});

export const resetForm = payload => ({
  type: ActionTypeForm.RESET_FORM,
  payload,
});
