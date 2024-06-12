/**
 * @description get data from redux store when perform the member actions
 */
import {createSelector} from 'reselect';
import {IUserState} from 'types';

const selector = (state: {user: IUserState}) => state.user;

export const getAttrByKey = (k: keyof IUserState) =>
  createSelector(selector, user => user[k]);
