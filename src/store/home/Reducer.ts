import {createReducer} from 'reduxsauce';
import {IHomeState} from 'types';
import {HomeTypes} from './Actions';

const INITIAL_STATE: IHomeState = {
  listSlider: [],
  newsGroup: [],
  listProject: [],
  contacts: [],
  contactEmp: [],
  visibleBanner: true,
};

const slideRequest = (state: IHomeState) => ({
  ...state,
  error: null,
  loading: true,
});

const slideSuccess = (state: IHomeState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  listSlider: payload,
});

const newsRequest = (state: IHomeState) => ({
  ...state,
  error: null,
  loading: true,
});

const newsSuccess = (state: IHomeState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  newsGroup: payload,
});

const onProcessRequest = (state: IHomeState) => ({
  ...state,
  error: null,
  loading: true,
});

const contactUsSuccess = (state: IHomeState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  contacts: payload,
});

const onProcessPCTRequest = (state: IHomeState) => ({
  ...state,
  error: null,
  loading: true,
});

const onProcessPCTSuccess = (state: IHomeState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  contactEmp: payload,
});

// const appSuccess = (state: IHomeState) => ({
//   ...state,
//   error: null,
//   loading: false,
// });

const appRequest = (state: IHomeState) => ({
  ...state,
  error: null,
  loading: true,
});

const appFailure = (state: IHomeState, action: any) => ({
  ...state,
  loading: false,
  error: action.error,
});

const onProjectSuccess = (state: IHomeState, {payload}: any) => ({
  ...state,
  error: null,
  loading: false,
  listProject: payload,
});

const toggleBannerADV = (state: IHomeState, {params}: any) => ({
  ...state,
  visibleBanner: params,
});

// // define handlers of the reducer
const HANDLERS = {
  [HomeTypes.SLIDER_REQUEST]: slideRequest,
  [HomeTypes.SLIDER_SUCCESS]: slideSuccess,
  [HomeTypes.NEWS_REQUEST]: newsRequest,
  [HomeTypes.NEWS_SUCCESS]: newsSuccess,
  [HomeTypes.CONTACT_US_REQUEST]: onProcessRequest,
  [HomeTypes.CONTACT_US_SUCCESS]: contactUsSuccess,
  [HomeTypes.CONTACT_PCT_REQUEST]: onProcessPCTRequest,
  [HomeTypes.CONTACT_PCT_SUCCESS]: onProcessPCTSuccess,
  [HomeTypes.CONTACT_PCT_FAILURE]: appFailure,
  [HomeTypes.GET_PROJECT_REQUEST]: appRequest,
  [HomeTypes.GET_PROJECT_SUCCESS]: onProjectSuccess,
  [HomeTypes.GET_PROJECT_FAILURE]: appFailure,
  [HomeTypes.TOGGLE_BANNER_ADV]: toggleBannerADV,
};

export const home = createReducer(INITIAL_STATE, HANDLERS);
