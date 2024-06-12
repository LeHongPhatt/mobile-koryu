import {Buttons, MainLayout, TextCus, TouchCus} from 'components';
import useCountDown from 'hooks/useCountDownTime';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, ScrollView, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {getHeight, HARD_OTP, strExists} from 'utils';
import styles from './styles';

export default function OTP() {
  const {timer, startTimer, stopTimer} = useCountDown({start: 120});
  const {
    timer: _timeR,
    startTimer: startTimerR,
    stopTimer: stopTimerR,
  } = useCountDown({start: 24});
  const {
    control,
    formState: {isDirty, isValid, isSubmitting},
    getValues,
  } = useForm<IFormDataLogin>();
  const {params} = NavigationService.route() || '';
  console.log('====================================');
  console.log(params);
  console.log('====================================');

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (getValues('otpInput') === HARD_OTP) {
      startTimer(120);
    }
  }, [getValues('otpInput')]);

  const checkOtp = () => {
    return getValues('otpInput') !== HARD_OTP || !isDirty || !isValid;
  };

  return (
    <MainLayout showAuthHeader bgColor={Colors.white}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.wrapLogo}>
            <TextCus bold style={[styles.fs24, styles.lh32]} useI18n color42>
              auth.otp_title
            </TextCus>
            <Divider style={getHeight(12)} />
            <TextCus useI18n caption1 labelColor style={styles.lh20}>
              auth.otp_subtitle
            </TextCus>
            <TextCus caption1 labelColor style={styles.lh20}>
              {params?.email}
            </TextCus>
            <Divider style={getHeight(16)} />
            {checkOtp() && (
              <TextCus
                style={[
                  styles.fs12,
                  styles.fw400,
                  styles.lh20,
                  styles.textError,
                ]}
                useI18n>
                error.error_otp_check
              </TextCus>
            )}
          </View>
          <View style={[styles.rowItem, styles.spaceItem]}>
            <Controller
              control={control}
              name="otpInput"
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
                maxLength: 6,
              }}
              render={({field: {onChange}}) => (
                <OtpInputs
                  keyboardType="phone-pad"
                  handleChange={onChange}
                  numberOfInputs={6}
                  autofillFromClipboard={false}
                  inputStyles={[
                    styles.inputOTP,
                    checkOtp() ? styles.otpInvalid : styles.otpValid,
                    styles.fs24,
                    styles.fw700,
                    styles.lh32,
                    styles.fontMonserat,
                  ]}
                  autoFocus
                />
              )}
            />
          </View>
          {getValues('otpInput') === HARD_OTP ? (
            <View style={[styles.rowItem, styles.cenItemvh, styles.flexWrap]}>
              <TextCus
                labelColor
                textAlign={'center'}
                style={[styles.fw500, styles.lh24, styles.mr2]}>
                Hiệu lực{' '}
              </TextCus>
              <TextCus
                style={[
                  styles.fw500,
                  styles.textCl16,
                  styles.lh24,
                  styles.mr2,
                ]}>
                {`${timer}s`}
              </TextCus>
            </View>
          ) : (
            <View style={[styles.rowItem, styles.cenItemvh, styles.flexWrap]}>
              <TextCus
                labelColor
                textAlign={'center'}
                style={[styles.fw500, styles.lh18, styles.mr2]}
                useI18n>
                {getValues('otpInput')
                  ? 'error.incorrect_otp'
                  : 'error.input_otp'}
              </TextCus>
              <TouchCus
                style={{justifyContent: 'flex-start'}}
                onPress={() => {
                  // openLink('url', EnumTermOfUse[`${i18n.language}`])
                  startTimerR(24);
                }}>
                <TextCus
                  mainLightColor
                  style={[
                    styles.fs14,
                    styles.fw500,
                    styles.lh18,
                    styles.underline,
                  ]}>
                  {`Gửi lại (${_timeR})s`}
                </TextCus>
              </TouchCus>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={[
          styles.rowItem,
          styles.p24,
          {position: 'absolute', bottom: strExists(keyboardStatus) ? 20 : 325},
        ]}>
        <Buttons
          style={[
            styles.flex1,
            styles.btnContinue,
            checkOtp() && !isSubmitting ? styles.bgDisable : styles.bgValid,
          ]}
          onPress={() => {
            NavigationService.navigate(Routes.ResetPassword, params);
            stopTimer();
            stopTimerR();
          }}
          disabled={checkOtp()}>
          <TextCus
            color42
            style={[styles.fs14, styles.fw400, styles.lh24]}
            useI18n>
            confirm_account
          </TextCus>
        </Buttons>
      </View>
    </MainLayout>
  );
}
