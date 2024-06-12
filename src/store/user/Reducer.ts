import {createReducer} from 'reduxsauce';
import {IUserState} from 'types';
import {UserTypes} from './Actions';

const INITIAL_STATE: IUserState = {
  loading: false,
  error: null,
  listNoti: [],
  notiTransactions: [],
  countBadget: 0,
};

const appRequest = (state: IUserState) => ({
  ...state,
  error: null,
  loading: true,
});

const notificationSuccess = (state: IUserState) => ({
  ...state,
  error: null,
  loading: false,
});

const appFailure = (state = INITIAL_STATE, {error}: any) => ({
  ...state,
  error,
  loading: false,
});

const getNotificationSuccess = (state: IUserState, {payload}: any) => ({
  ...state,
  listNoti: payload,
  error: null,
  loading: false,
});

const getNotiTransactionSuccess = (state: IUserState, {payload}: any) => ({
  ...state,
  notiTransactions: payload,
  error: null,
  loading: false,
});

const countBadgetSuccess = (state: IUserState, {payload}: any) => ({
  ...state,
  error: null,
  countBadget: payload,
  loading: false,
});

const HANDLERS = {
  [UserTypes.MARK_NOTIFICATION_SUCCESS]: notificationSuccess,
  [UserTypes.GET_NOTIFICATION_REQUEST]: appRequest,
  [UserTypes.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
  [UserTypes.GET_NOTIFICATION_FAILURE]: appFailure,
  [UserTypes.GET_MY_TRANSACTION_NOTI_REQUEST]: appRequest,
  [UserTypes.GET_MY_TRANSACTION_NOTI_SUCCESS]: getNotiTransactionSuccess,
  [UserTypes.GET_MY_TRANSACTION_NOTI_FAILURE]: appFailure,
  [UserTypes.GET_BADGET_SUCCESS]: countBadgetSuccess,
};

export const user = createReducer(INITIAL_STATE, HANDLERS);
