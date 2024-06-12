/**
 * @description the hook to handle all authentication's action
 */
import {useKey} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  COMFIRM_OTP_ACT,
  CONFIRM_FORGOT_PWD_ACT,
  DEL_AVATAR,
  FORGOT_PASSWORD_ACT,
  LOGIN_ACT,
  LOGIN_WITH_GUEST,
  LOGIN_WITH_SECKEY,
  LOGOUT_ACT,
  REFRESH_TOKEN_ACT,
  REGISTER_ACT,
  RESET_PASSWORD,
  UPDATE_AVATAR,
  UPDATE_PROFILE,
  UPDATE_PWD,
} from 'services/actionsUserParam';
import * as AppActions from 'store/app';
import {AppSelectors} from 'store/app';
import {
  IFormConfirmOTP,
  IFormDataLogin,
  IFormForgotPassword,
  IFormImgData,
  IFormLoginNonePass,
  IFormRegisterData,
  IFormResetPassword,
  IUser,
} from 'types';
import {encryptRSA, getCurrentTS} from 'utils/libs';
import {useNotify} from './useNotify';
export interface AuthHook {
  captcha?: string;
  access_token?: string;
  user?: IUser;
  loading: boolean;
  showCaptcha?: boolean;
  onLogin: (params: IFormDataLogin) => void;
  onLoginWithSecKey: (params: IFormLoginNonePass | any) => void;
  onLoginWithGuest: (params: string) => void;
  onLogout: () => void;
  onRefreshToken: () => void;
  onForgotPassword: (
    params?: IFormForgotPassword | any,
    route?: string,
  ) => void;
  onRegister: (params: IFormRegisterData | any, route?: string) => void;
  onSubmitOTP: (params: IFormConfirmOTP) => void;
  onResetPwd: (params: IFormResetPassword) => void;
  onUpdateProfile: (params: IFormRegisterData, callback?: any) => void;
  onHandleImage: (params: IFormImgData, callback?: any) => void;
}

export const useAuth = (): AuthHook => {
  const dispatch = useDispatch();
  const {danger, success} = useNotify();
  const {t} = useTranslation();
  const {savePwd, resetPwd, saveKeyStore, getKeyStore} = useKey();
  const user = useSelector(AppSelectors.getAttrByKey('user'));
  const access_token = useSelector(AppSelectors.getAttrByKey('token'));
  const captcha = useSelector(AppSelectors.getCaptcha);
  const loading: boolean = useSelector(AppSelectors.getAuthLoading);

  const onRefreshToken = useCallback(async () => {
    const refreshToken = await getKeyStore('refreshToken');
    const salt = await encryptRSA(`${getCurrentTS()}`);
    const formData = {
      ...REFRESH_TOKEN_ACT,
      data: [{refreshToken, salt}],
    };
    try {
      dispatch(
        AppActions.refreshToken(formData, async (res: any) => {
          if (res.success) {
            if (res.data?.token) {
              await saveKeyStore('token', res.data.token);
            }
            if (res.data?.refreshToken) {
              await saveKeyStore('refreshToken', res.data.refreshToken);
            }
          }
        }),
      );
    } catch (error) {
      // danger(t('error'), error?.message);
    }
  }, [dispatch]);

  const onLogin = useCallback(
    async (formData: IFormDataLogin) => {
      console.log('formData.IFormDataLogin', formData);
      const refreshToken = await getKeyStore('refreshToken');

      LOGIN_ACT.data[0].phonenumber = formData.account;
      LOGIN_ACT.data[0].password = formData.password;
      LOGIN_ACT.data[0].captcha = formData.captcha;
      LOGIN_ACT.data[0].refreshToken = refreshToken;

      try {
        dispatch(
          AppActions.loginRequest(LOGIN_ACT, async res => {
            if (res.success) {
              if (formData.checked) {
                await savePwd(formData.account, formData.password);
              } else {
                await resetPwd('account');
              }
              if (res.data?.token) {
                await saveKeyStore('token', res.data.token);
              }
              if (res.data?.refreshToken) {
                await saveKeyStore('refreshToken', res.data.refreshToken);
              }
              NavigationService.replace(Routes.Main);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  // handle logout user
  const onLogout = useCallback(async () => {
    const refreshToken = await getKeyStore('refreshToken');

    LOGOUT_ACT.data[0].refreshToken = refreshToken;

    dispatch(
      AppActions.logoutRequest(LOGOUT_ACT, res => {
        if (res.success) {
          success(t('label.notify'), res.message);
          resetPwd('token');
          // resetPwd('refreshToken'); // keep refreshToken
          //refreshToken
          NavigationService.replace(Routes.PreLogin, {forceLogGuess: true});
        }
      }),
    );
  }, [dispatch]);

  const onForgotPassword = useCallback(
    async (formData: IFormForgotPassword, currentScreen?: string) => {
      FORGOT_PASSWORD_ACT.data[0].mail = formData.email;
      FORGOT_PASSWORD_ACT.data[0].phonenumber = formData?.phone || '';
      FORGOT_PASSWORD_ACT.data[0].captcha = formData.captcha;
      try {
        dispatch(
          AppActions.forgotRequest(FORGOT_PASSWORD_ACT, res => {
            if (res.success) {
              if (currentScreen !== Routes.ConfirmOTP) {
                formData.route = Routes.ForgotPassword;
                formData.confirmCode = res.data.confirmCode;
                NavigationService.navigate(Routes.ConfirmOTP, formData);
              }
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  // handle register new user
  const onRegister = useCallback(
    async (formData: IFormRegisterData, currentScreen?: string) => {
      REGISTER_ACT.data[0].mail = formData.email;
      REGISTER_ACT.data[0].phonenumber = formData.phonenumber;
      REGISTER_ACT.data[0].name = formData.name;
      REGISTER_ACT.data[0].captcha = formData.captcha;
      try {
        dispatch(
          AppActions.registerRequest(REGISTER_ACT, res => {
            if (res.success) {
              if (currentScreen !== Routes.ConfirmOTP) {
                formData.route = Routes.Register;
                formData.confirmKey = res.data.confirmKey;
                NavigationService.navigate(Routes.ConfirmOTP, formData);
              }
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error.message);
      }
    },
    [danger, dispatch, t],
  );

  const onHandleImage = useCallback(
    async (formData: IFormImgData, callback?: (r) => void) => {
      DEL_AVATAR.data[0].referencekey1 = formData.referencekey1;

      try {
        dispatch(
          AppActions.handleImageRequest(DEL_AVATAR, res => {
            if (res.success) {
              const params = {
                ...UPDATE_AVATAR,
                data: [formData],
              };

              dispatch(
                AppActions.handleImageRequest(params, r => {
                  if (r.success) {
                    success(t('label.notify'), r.message);
                    if (callback) {
                      callback(r);
                    }
                  } else {
                    danger(t('error'), r?.message);
                  }
                }),
              );
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error.message);
      }
    },
    [danger, dispatch, t],
  );

  const onUpdateProfile = useCallback(
    async (formData: IFormRegisterData) => {
      const params = {
        ...UPDATE_PROFILE,
        data: [formData],
      };
      try {
        dispatch(
          AppActions.updateProfileRequest(params, res => {
            if (res.success) {
              if (formData.dataImage) {
                onHandleImage(formData.dataImage);
                return false;
              }
              success(t('label.notify'), res.message);
              NavigationService.goBack();
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error.message);
      }
    },
    [danger, dispatch, t],
  );

  const onSubmitOTP = useCallback(
    async (formData: IFormConfirmOTP) => {
      const params =
        formData.route === Routes.Register
          ? COMFIRM_OTP_ACT
          : CONFIRM_FORGOT_PWD_ACT;
      params.data[0].verifyCode = formData.code;
      params.data[0].confirmCode = formData.confirmCode;
      if (formData.route === Routes.Register) {
        params.data[0].confirmKey = formData.confirmKey;
      }
      try {
        dispatch(
          AppActions.confirmOTPRequest(params, res => {
            if (res.success) {
              if (formData.route === Routes.ForgotPassword) {
                formData.secKey = res.data.secKey;
                NavigationService.navigate(Routes.ResetPassword, formData);
              }
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error.message);
      }
    },
    [danger, dispatch, t],
  );
  const onLoginWithSecKey = useCallback(
    async (formData: IFormLoginNonePass) => {
      const refreshToken = await getKeyStore('refreshToken');

      LOGIN_WITH_SECKEY.data[0].phonenumber = formData.phonenumber;
      LOGIN_WITH_SECKEY.data[0].secKey = formData.secKey;
      LOGIN_WITH_SECKEY.data[0].captcha = formData.captcha;
      LOGIN_WITH_SECKEY.data[0].refreshToken = refreshToken;
      if (user?.newPassword) {
        formData.newPassword = user.newPassword;
      }
      dispatch(
        AppActions.loginRequest(LOGIN_WITH_SECKEY, async res => {
          if (res.success) {
            if (res.data?.token) {
              await saveKeyStore('token', res.data.token);
            }
            formData.route = Routes.Register;
            NavigationService.navigate(Routes.ResetPassword, formData);
          } else {
            danger(t('error'), res?.message);
          }
        }),
      );
    },
    [danger, dispatch, t],
  );

  const onLoginWithGuest = useCallback(
    async (params: string) => {
      LOGIN_WITH_GUEST.data[0].captcha = params;
      dispatch(
        AppActions.loginRequest(LOGIN_WITH_GUEST, async res => {
          if (res.success) {
            if (res.data?.token) {
              await saveKeyStore('token', res.data.token);
            }
          } else {
            danger(t('error'), res?.message);
          }
        }),
      );
    },
    [danger, dispatch, t],
  );

  const onResetPwd = useCallback(
    async (formData: IFormResetPassword) => {
      let params = {};
      if (
        formData.route === Routes.Register ||
        formData.route === Routes.ChangePassword
      ) {
        params = UPDATE_PWD;
        params.data[0].NEW_PASS = formData.password;
        params.data[0].OLD_PASS = formData.newPassword;
      } else {
        params = RESET_PASSWORD;
        params.data[0].password = formData.password;
        params.data[0].secKey = formData.secKey;
        params.data[0].confirmCode = formData.confirmCode;
      }

      try {
        dispatch(
          AppActions.resetRequest(params, res => {
            if (res.success) {
              NavigationService.replace(Routes.Login);
            } else {
              danger(t('error'), res?.message);
            }
          }),
        );
      } catch (error) {
        danger(t('error'), error?.message);
      }
    },
    [danger, dispatch, t],
  );

  return {
    captcha,
    user,
    loading,
    access_token,
    onRefreshToken,
    onLogin,
    onLogout,
    onRegister,
    onForgotPassword,
    onSubmitOTP,
    onResetPwd,
    onLoginWithSecKey,
    onUpdateProfile,
    onHandleImage,
    onLoginWithGuest,
  };
};
