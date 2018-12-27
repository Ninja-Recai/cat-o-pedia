import { ActionTypeCat } from 'actions/constants';

export const addCat = payload => ({
  type: ActionTypeCat.ADD_CAT,
  payload,
  meta: {
    fetch: {
      pathname: '/cats/addCat',
      type: 'SINGLE',
      method: 'POST',
    },
  },
});
