import {createTypes} from 'reduxsauce';
import {IParamsRequest} from 'types';

/**
 * @description define types of user's actions
 */
export const UserTypes = createTypes(`
  MARK_NOTIFICATION_REQUEST
  MARK_NOTIFICATION_SUCCESS
  MARK_NOTIFICATION_FAILURE

  GET_NOTIFICATION_REQUEST
  GET_NOTIFICATION_SUCCESS
  GET_NOTIFICATION_FAILURE

  GET_MY_TRANSACTION_NOTI_REQUEST
  GET_MY_TRANSACTION_NOTI_SUCCESS
  GET_MY_TRANSACTION_NOTI_FAILURE

  ACCOUNT_INFORMATION_REQUEST
  ACCOUNT_INFORMATION_SUCCESS
  ACCOUNT_INFORMATION_FAILURE

  ACTION_CHANGE_LANGUAGE_REQUEST
  ACTION_CHANGE_LANGUAGE_SUCCESS
  ACTION_CHANGE_LANGUAGE_FAILURE

  GET_BADGET_REQUEST
  GET_BADGET_SUCCESS
  GET_BADGET_FAILURE

  UPDATE_NOTIFICATION_REQUEST
  UPDATE_NOTIFICATION_SUCCESS
  UPDATE_NOTIFICATION_FAILURE
`);

export const notificationSuccess = (payload: any) => ({
  payload,
  type: UserTypes.MARK_NOTIFICATION_SUCCESS,
});

export const notificationFailure = (error: string) => ({
  error,
  type: UserTypes.MARK_NOTIFICATION_FAILURE,
});

export const markNotificationRequest = (
  formData: IParamsRequest,
  callback?: () => void,
) => ({
  formData,
  callback,
  type: UserTypes.MARK_NOTIFICATION_REQUEST,
});

export const getMyTransactionNoti = (
  formData: IParamsRequest,
  callback?: () => void,
) => ({
  formData,
  callback,
  type: UserTypes.GET_MY_TRANSACTION_NOTI_REQUEST,
});

export const updateNotificationRequest = (
  formData: IParamsRequest,
  callback?: () => void,
) => ({
  formData,
  callback,
  type: UserTypes.UPDATE_NOTIFICATION_REQUEST,
});

export const getNotificationRequest = (formData: IParamsRequest) => ({
  formData,
  type: UserTypes.GET_NOTIFICATION_REQUEST,
});

export const getNotificationSuccess = (payload: any) => ({
  payload,
  type: UserTypes.GET_NOTIFICATION_SUCCESS,
});

export const getNotificationFailure = (error: string) => ({
  error,
  type: UserTypes.GET_NOTIFICATION_FAILURE,
});

export const accountInformationRequest = (
  formData: IParamsRequest,
  callback: () => {},
) => ({
  formData,
  callback,
  type: UserTypes.ACCOUNT_INFORMATION_REQUEST,
});

export const accountInformationSuccess = (payload: any) => ({
  payload,
  type: UserTypes.ACCOUNT_INFORMATION_SUCCESS,
});

export const accountInformationFailure = (error: string) => ({
  error,
  type: UserTypes.ACCOUNT_INFORMATION_FAILURE,
});

export const changeLanguageRequest = (
  formData: IParamsRequest,
  callback?: (rs: any) => {},
) => ({
  formData,
  callback,
  type: UserTypes.ACTION_CHANGE_LANGUAGE_REQUEST,
});

export const changeLanguageSuccess = (payload: any) => ({
  payload,
  type: UserTypes.ACTION_CHANGE_LANGUAGE_SUCCESS,
});

export const changeLanguageFailure = (error: string) => ({
  error,
  type: UserTypes.ACTION_CHANGE_LANGUAGE_FAILURE,
});

export const onGetBadgetRequest = (params: IParamsRequest) => ({
  type: UserTypes.GET_BADGET_REQUEST,
  params,
});
