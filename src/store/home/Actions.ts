import {createTypes} from 'reduxsauce';
import {IParamsRequest} from 'types';

/**
 * @description define types of authentication actions
 */
export const HomeTypes = createTypes(`
  SLIDER_REQUEST
  SLIDER_SUCCESS

  NEWS_REQUEST
  NEWS_SUCCESS

  CONTACT_US_FAILURE
  CONTACT_US_REQUEST
  CONTACT_US_SUCCESS

  CONTACT_PCT_FAILURE
  CONTACT_PCT_REQUEST
  CONTACT_PCT_SUCCESS

  GET_PROJECT_REQUEST
  GET_PROJECT_SUCCESS
  GET_PROJECT_FAILURE

  TOGGLE_BANNER_ADV
`);

export const slideRequest = (params: IParamsRequest) => ({
  type: HomeTypes.SLIDER_REQUEST,
  params,
});

export const slideSuccess = (payload: any) => ({
  type: HomeTypes.SLIDER_SUCCESS,
  payload,
});

export const newsRequest = (params: IParamsRequest) => ({
  type: HomeTypes.NEWS_REQUEST,
  params,
});

export const newsSuccess = (payload: any) => ({
  type: HomeTypes.NEWS_SUCCESS,
  payload,
});

export const onProcessRequest = (params: IParamsRequest) => ({
  type: HomeTypes.CONTACT_US_REQUEST,
  params,
});

export const onProcessPCTRequest = (params: IParamsRequest) => ({
  type: HomeTypes.CONTACT_PCT_REQUEST,
  params,
});

export const onGetProjectRequest = (params: IParamsRequest) => ({
  type: HomeTypes.GET_PROJECT_REQUEST,
  params,
});

export const onToggleBanner = (params: boolean) => ({
  type: HomeTypes.TOGGLE_BANNER_ADV,
  params,
});
