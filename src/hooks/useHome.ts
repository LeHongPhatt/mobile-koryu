import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CONTACT_PCT,
  CONTACT_US,
  GET_PROJECT,
  GET_SLIDER_TC,
} from 'services/actionsHomeParam';
import {GET_NEWS} from 'services/actionsNewsParam';
import * as HomeActions from 'store/home';
import {HomeSelectors} from 'store/home';
import {useAuth} from './useAuth';

export const useHome = () => {
  const {user} = useAuth();
  const dispatch = useDispatch();
  const listSlider = useSelector(HomeSelectors.getListSlider);
  const newsGroup = useSelector(HomeSelectors.getNewsGroup);
  const listProject = useSelector(HomeSelectors.getListProject);
  const contacts = useSelector(HomeSelectors.getContactUs);
  const contactPCT = useSelector(HomeSelectors.getContactPCT);
  const loading = useSelector(HomeSelectors.getLoading);
  const visibleBanner = useSelector(HomeSelectors.getToggleBanner);

  const onLoadSlider = useCallback(() => {
    return dispatch(HomeActions.slideRequest(GET_SLIDER_TC));
  }, [dispatch]);

  const onLoadNews = useCallback(() => {
    return dispatch(HomeActions.newsRequest(GET_NEWS));
  }, [dispatch]);

  const onGetProject = useCallback(
    (formData?: any) => {
      const params = {
        ...GET_PROJECT,
        data: [
          {
            ...GET_PROJECT.data[0],
            searchString: formData?.searchString, // item
          },
        ],
      };
      return dispatch(HomeActions.onGetProjectRequest(params));
    },
    [dispatch],
  );

  const onContactUs = useCallback(() => {
    return dispatch(HomeActions.onProcessRequest(CONTACT_US));
  }, [dispatch]);

  const onContactPCT = useCallback(() => {
    CONTACT_PCT.data[0].customer = user?.prospect ?? '';
    return dispatch(HomeActions.onProcessPCTRequest(CONTACT_PCT));
  }, [dispatch]);

  const toggleBanner = useCallback(
    async (params: boolean) => {
      try {
        dispatch(HomeActions.onToggleBanner(params));
      } catch (error) {}
    },
    [dispatch],
  );

  return {
    onLoadSlider,
    onLoadNews,
    onContactUs,
    onContactPCT,
    onGetProject,
    toggleBanner,
    listSlider,
    newsGroup,
    listProject,
    loading,
    contacts,
    contactPCT,
    visibleBanner,
  };
};
