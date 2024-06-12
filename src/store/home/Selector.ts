/**
 * @description get data from redux store when perform the user authentication
 */
import {createSelector} from 'reselect';
import {IHomeState} from 'types';

const selector = (state: {home: IHomeState}) => state.home;

export const getError = createSelector(
  selector,
  ({error}: IHomeState) => error,
);

export const getLoading = createSelector(
  selector,
  ({loading}: IHomeState) => loading,
);

export const getListSlider = createSelector(selector, home => home.listSlider);

export const getNewsGroup = createSelector(selector, home => home.newsGroup);

export const getListProject = createSelector(
  selector,
  home => home.listProject,
);

export const getContactUs = createSelector(selector, home => home.contacts);

export const countBadget = createSelector(selector, home => home.countBadget);

export const getContactPCT = createSelector(selector, home => home.contactEmp);
export const getToggleBanner = createSelector(
  selector,
  ({visibleBanner}: IHomeState) => visibleBanner || false,
);
