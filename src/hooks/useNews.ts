import {useNotify} from 'hooks';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_EVENT_LIST,
  GET_EVENT_LIST_RELATED,
  GET_IMG_EVENT_DETAIL,
  GET_IMG_NEWS_DETAIL,
  GET_IMG_POM_DETAIL,
  GET_NEWS_LIST,
  GET_NEWS_LIST_RELATED,
  GET_POM_LIST,
  GET_POM_LIST_RELATED,
  NEWS_PIN_ACTION,
  UPDATE_EVENT_JOIN,
  UPDATE_POM_JOIN,
} from 'services/actionsNewsParam';
import * as NewsActions from 'store/news';
import {NewsSelectors} from 'store/news';
import {IFormEventList, IFormNewsList, IPinParams} from 'types';

export const useNews = () => {
  const dispatch = useDispatch();
  const {danger} = useNotify();
  const {t} = useTranslation();
  const loading = useSelector(NewsSelectors.getAttrByKey('loading'));
  const listNews = useSelector(NewsSelectors.getAttrByKey('newsList'));
  const listNewsImg = useSelector(NewsSelectors.getAttrByKey('newsImgList'));
  const listNewsRelated = useSelector(
    NewsSelectors.getAttrByKey('newsListRelated'),
  );
  const listEvent = useSelector(NewsSelectors.getAttrByKey('eventList'));
  const listPOM = useSelector(NewsSelectors.getAttrByKey('pomList'));
  const listPin = useSelector(NewsSelectors.getAttrByKey('listPin'));
  const listPinAdmin = useSelector(NewsSelectors.getAttrByKey('listPinAdmin'));
  const listUnPin = useSelector(NewsSelectors.getAttrByKey('listUnPin'));

  const onNewsList = useCallback(
    (formData: IFormNewsList) => {
      const params = {
        ...GET_NEWS_LIST,
        data: [
          {
            ...GET_NEWS_LIST.data[0],
            searchString: formData.searchString, // item
            newstype: formData.newstype, // code
            sort: formData.sort,
          },
        ],
      };
      return dispatch(NewsActions.newsListRequest(params));
    },
    [dispatch],
  );

  const onNewsListRelated = useCallback(
    (formData: IFormNewsList) => {
      const param = {
        EVETYPE: GET_EVENT_LIST_RELATED,
        NEWTYPE: GET_NEWS_LIST_RELATED,
        POMTYPE: GET_POM_LIST_RELATED,
      };
      const params = {
        ...param[formData?.type],
        data: [
          {
            ...param[formData?.type].data[0],
            project: formData.project, // item
            newstype: formData.newstype, // code
            customer: formData.customer, // code
            eventstype: formData.eventstype, // code
            promotiontype: formData.promotiontype,
          },
        ],
      };
      return dispatch(NewsActions.newsListRelatedRequest(params));
    },
    [dispatch],
  );

  const onEventPOM = useCallback(
    (formData: IFormNewsList) => {
      try {
        const param = {
          EVETYPE: UPDATE_EVENT_JOIN,
          POMTYPE: UPDATE_POM_JOIN,
        };

        const params = {
          ...param[formData?.type],
          data: [
            {
              ...param[formData?.type].data[0],
              promotioncode: formData.promotioncode, // item
              eventscode: formData.eventscode, // code
              customer: formData.customer, // code
              cusname: formData.cusname, // code
              attend: formData.attend,
            },
          ],
        };
        dispatch(NewsActions.eventPomCheckRequest(params));
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  const onNewsImgList = useCallback(
    (formData: IFormNewsList) => {
      const param = {
        EVETYPE: GET_IMG_EVENT_DETAIL,
        NEWTYPE: GET_IMG_NEWS_DETAIL,
        POMTYPE: GET_IMG_POM_DETAIL,
      };

      const params = {
        ...param[formData?.type],
        data: [
          {
            ...param[formData?.type].data[0],
            eventscode: formData.eventscode,
            promotioncode: formData.promotioncode,
            newsid: formData.newsid, // item
          },
        ],
      };
      return dispatch(NewsActions.newsImgDetailRequest(params));
    },
    [dispatch],
  );

  const onEventList = useCallback(
    (formData: IFormEventList) => {
      const params = {
        ...GET_EVENT_LIST,
        data: [
          {
            ...GET_EVENT_LIST.data[0],
            sort: formData.sort,
            searchString: formData.searchString, // item
            eventstype: formData.eventstype, // code
            customer: formData.customer, // code
          },
        ],
      };
      return dispatch(NewsActions.eventListRequest(params));
    },
    [dispatch],
  );

  const onPOMList = useCallback(
    (formData: IFormEventList) => {
      const params = {
        ...GET_POM_LIST,
        data: [
          {
            ...GET_POM_LIST.data[0],
            sort: formData.sort,
            searchString: formData.searchString, // item
            promotiontype: formData.promotiontype, // code
            customer: formData.customer, // code
          },
        ],
      };
      return dispatch(NewsActions.pomListRequest(params));
    },
    [dispatch],
  );

  const onActionPinList = useCallback(
    (params: IPinParams, callback?: (rs?: any) => void) => {
      const prms = {
        ...NEWS_PIN_ACTION,
        data: [
          {
            ...NEWS_PIN_ACTION.data[0],
            newsid: params?.newsid,
            ispin: params?.ispin,
          },
        ],
      };
      return dispatch(NewsActions.pinListRequest(prms, rs => callback?.(rs)));
    },
    [dispatch],
  );

  const onPinList = useCallback(
    (params: any) => {
      return dispatch(NewsActions.pinRequest(params));
    },
    [dispatch],
  );

  const setPinListRequest = useCallback(
    (params: any) => {
      return dispatch(NewsActions.setPinListRequest(params));
    },
    [dispatch],
  );

  const unPinListRequest = useCallback(
    (params: any) => {
      return dispatch(NewsActions.unPinListRequest(params));
    },
    [dispatch],
  );

  const setPinListAdminRequest = useCallback(
    (params: any) => {
      return dispatch(NewsActions.setPinListAdminRequest(params));
    },
    [dispatch],
  );

  const unPinListAdmin = useCallback(
    (params: any) => {
      return dispatch(NewsActions.unPinListAdminRequest(params));
    },
    [dispatch],
  );

  return {
    onNewsList,
    onEventList,
    onPOMList,
    onNewsListRelated,
    onNewsImgList,
    onEventPOM,
    onActionPinList,
    onPinList,
    setPinListRequest,
    unPinListRequest,
    setPinListAdminRequest,
    unPinListAdmin,
    listUnPin,
    listNewsImg,
    loading,
    listNews,
    listNewsRelated,
    listEvent,
    listPOM,
    listPin,
    listPinAdmin,
  };
};
