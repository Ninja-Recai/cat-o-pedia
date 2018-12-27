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

export const getCats = payload => ({
  type: ActionTypeCat.GET_CATS,
  payload,
  meta: {
    fetch: {
      pathname: '/cats/getList',
      type: 'SINGLE',
      method: 'GET',
    },
  },
});

export const getSingleCat = payload => ({
  type: ActionTypeCat.GET_SINGLE_CAT,
  payload,
  meta: {
    fetch: {
      pathname: `/cats/getSingleCat/${payload}`,
      type: 'SINGLE',
      method: 'GET',
    },
  },
});
