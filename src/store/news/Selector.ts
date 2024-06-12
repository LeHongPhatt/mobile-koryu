/**
 * @description get data from redux store when perform the member actions
 */
import {createSelector} from 'reselect';
import {INewsState} from 'types';

const selector = (state: {news: INewsState}) => state.news;

export const getAttrByKey = (k: keyof INewsState) =>
  createSelector(selector, news => news[k]);
