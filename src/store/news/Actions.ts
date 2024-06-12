import {createTypes} from 'reduxsauce';
import {IParamsRequest} from 'types';

/**
 * @description define types of user's actions
 */
export const NewsTypes = createTypes(`
    NEWS_LIST_FAILURE
    NEWS_LIST_REQUEST
    NEWS_LIST_SUCCESS

    NEWS_DETAIL_IMG_FAILURE
    NEWS_DETAIL_IMG_REQUEST
    NEWS_DETAIL_IMG_SUCCESS

    NEWS_LIST_RELATED_FAILURE
    NEWS_LIST_RELATED_REQUEST
    NEWS_LIST_RELATED_SUCCESS

    EVENT_LIST_FAILURE
    EVENT_LIST_REQUEST
    EVENT_LIST_SUCCESS

    POM_LIST_FAILURE
    POM_LIST_REQUEST
    POM_LIST_SUCCESS

    EVENT_POM_CHECK_FAILURE
    EVENT_POM_CHECK_REQUEST
    EVENT_POM_CHECK_SUCCESS

    PIN_LIST_REQUEST
    PIN_LIST_SUCCESS
    PIN_LIST_FAILURE

    UN_PIN_LIST_REQUEST
    SET_PIN_LIST_REQUEST

    UN_PIN_LIST_ADMIN_REQUEST
    SET_PIN_LIST_ADMIN_REQUEST
`);

export const newsListRequest = (params: IParamsRequest) => ({
  type: NewsTypes.NEWS_LIST_REQUEST,
  params,
});

export const newsImgDetailRequest = (params: IParamsRequest) => ({
  type: NewsTypes.NEWS_DETAIL_IMG_REQUEST,
  params,
});

export const newsListRelatedRequest = (params: IParamsRequest) => ({
  type: NewsTypes.NEWS_LIST_RELATED_REQUEST,
  params,
});

export const eventListRequest = (params: IParamsRequest) => ({
  type: NewsTypes.EVENT_LIST_REQUEST,
  params,
});

export const pomListRequest = (params: IParamsRequest) => ({
  type: NewsTypes.POM_LIST_REQUEST,
  params,
});

export const eventPomCheckRequest = (
  params: IParamsRequest,
  callback?: void,
) => ({
  type: NewsTypes.EVENT_POM_CHECK_REQUEST,
  params,
  callback,
});

export const pinListRequest = (payload: any, callback?: (rs: any) => void) => ({
  type: NewsTypes.PIN_LIST_REQUEST,
  payload,
  callback,
});

export const pinRequest = (payload: any) => ({
  type: NewsTypes.PIN_LIST_REQUEST,
  payload,
});

export const setPinListRequest = (payload: any) => ({
  type: NewsTypes.SET_PIN_LIST_REQUEST,
  payload,
});

export const unPinListRequest = (payload: any) => ({
  type: NewsTypes.UN_PIN_LIST_REQUEST,
  payload,
});

export const setPinListAdminRequest = (payload: any) => ({
  type: NewsTypes.SET_PIN_LIST_ADMIN_REQUEST,
  payload,
});

export const unPinListAdminRequest = (payload: any) => ({
  type: NewsTypes.UN_PIN_LIST_ADMIN_REQUEST,
  payload,
});
