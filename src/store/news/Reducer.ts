import AsyncStorage from '@react-native-async-storage/async-storage';
import {createReducer} from 'reduxsauce';
import {CateByType, INewsState} from 'types';
import {EnumPinType} from 'utils/enum';
import {NewsTypes} from './Actions';

const INITIAL_STATE: INewsState = {
  loading: false,
  error: null,
  newsList: [],
  newsListRelated: [],
  newsImgList: [],
  eventList: [],
  pomList: [],
  eventListRelated: [],
  pomListRelated: [],
  eventPomCheck: null,
  listPin: [],
  listPinAdmin: [],
  listUnPin: [],
};

const appRequest = (state: INewsState) => ({
  ...state,
  error: null,
  loading: true,
});

const appFailure = (state: INewsState, action: any) => ({
  ...state,
  loading: false,
  error: action.error,
});

const newsListSuccess = (state: INewsState, {payload}: any) => {
  return {
    ...state,
    error: null,
    loading: false,
    newsList: payload,
  };
};

const newsListRelatedSuccess = (state: INewsState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  newsListRelated: payload,
});

const eventListSuccess = (state: INewsState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  eventList: payload,
});

const pomListSuccess = (state: INewsState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  pomList: payload,
});

const newsImgListSuccess = (state: INewsState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  newsImgList: payload,
});

const eventPomCheckSuccess = (state: INewsState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  eventPomCheck: payload,
});

const setPinListRequest = (state: INewsState, {payload}: any) => ({
  ...state,
  listPin: payload,
});

const pinListRequest = (state: INewsState, {payload}: any) => {
  const {it, screenType} = payload;

  const oldList = [...state.listPin];
  let newList: any = [];

  if (oldList.length > 0) {
    oldList.unshift(it);
    newList = oldList;
  } else {
    oldList.push(it);
    newList.push(it);
  }

  AsyncStorage.setItem(
    `${screenType}-${EnumPinType.USER}`,
    JSON.stringify(newList),
  );

  return {
    ...state,
    listPin: newList,
  };
};

const unPinList = (state: INewsState, {payload}: any) => {
  const {it, screenType} = payload;

  const oldList = [...state.listPin];
  let newList: any = [];

  newList = oldList.filter(item => {
    switch (screenType) {
      case CateByType.NEWTYPE: {
        return item?.newsid !== it?.newsid;
      }
      case CateByType.EVETYPE: {
        return item?.eventscode !== it?.eventscode;
      }
      case CateByType.POMTYPE: {
        return item?.promotioncode !== it?.promotioncode;
      }
    }
  });

  AsyncStorage.setItem(
    `${screenType}-${EnumPinType.USER}`,
    JSON.stringify(newList),
  );

  return {
    ...state,
    listPin: newList,
  };
};

const setPinListAdminRequest = (state: INewsState, {payload}: any) => ({
  ...state,
  listPinAdmin: payload,
});

const unPinListAdmin = (state: INewsState, {payload}: any) => {
  let newList = [...state.listUnPin, payload];

  AsyncStorage.setItem(
    `${CateByType.NEWTYPE}-${EnumPinType.ADMIN}`,
    JSON.stringify(newList),
  );

  return {
    ...state,
    listUnPin: newList,
  };
};

const HANDLERS = {
  [NewsTypes.NEWS_LIST_REQUEST]: appRequest,
  [NewsTypes.NEWS_LIST_SUCCESS]: newsListSuccess,
  [NewsTypes.NEWS_LIST_FAILURE]: appFailure,
  [NewsTypes.NEWS_DETAIL_IMG_REQUEST]: appRequest,
  [NewsTypes.NEWS_DETAIL_IMG_SUCCESS]: newsImgListSuccess,
  [NewsTypes.NEWS_DETAIL_IMG_FAILURE]: appFailure,
  [NewsTypes.NEWS_LIST_RELATED_REQUEST]: appRequest,
  [NewsTypes.NEWS_LIST_RELATED_SUCCESS]: newsListRelatedSuccess,
  [NewsTypes.NEWS_LIST_RELATED_FAILURE]: appFailure,
  [NewsTypes.EVENT_LIST_REQUEST]: appRequest,
  [NewsTypes.EVENT_LIST_SUCCESS]: eventListSuccess,
  [NewsTypes.EVENT_LIST_FAILURE]: appFailure,
  [NewsTypes.EVENT_POM_CHECK_REQUEST]: appRequest,
  [NewsTypes.EVENT_POM_CHECK_SUCCESS]: eventPomCheckSuccess,
  [NewsTypes.EVENT_POM_CHECK_FAILURE]: appFailure,
  [NewsTypes.POM_LIST_REQUEST]: appRequest,
  [NewsTypes.POM_LIST_SUCCESS]: pomListSuccess,
  [NewsTypes.POM_LIST_FAILURE]: appFailure,
  [NewsTypes.PIN_LIST_REQUEST]: pinListRequest,
  [NewsTypes.SET_PIN_LIST_REQUEST]: setPinListRequest,
  [NewsTypes.UN_PIN_LIST_REQUEST]: unPinList,
  [NewsTypes.SET_PIN_LIST_ADMIN_REQUEST]: setPinListAdminRequest,
  [NewsTypes.UN_PIN_LIST_ADMIN_REQUEST]: unPinListAdmin,
};

export const news = createReducer(INITIAL_STATE, HANDLERS);
