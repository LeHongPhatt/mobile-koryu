import {yupResolver} from '@hookform/resolvers/yup';
import {Images} from 'assets';
import SvgIcon from 'assets/IconSVG';
import {
  Buttons,
  ImageCus,
  MainLayout,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ImageBackground, Keyboard, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {getHeight, getWidth, strExists} from 'utils';
import {validateEmailShema} from 'utils/validate';
import styles from './styles';

export default function Login() {
  const {t} = useTranslation();
  const {
    control,
    formState: {errors, isDirty, isValid},
    handleSubmit,
  } = useForm<IFormDataLogin>({
    mode: 'onChange',
    resolver: yupResolver(validateEmailShema),
  });

  console.log('errors.Login', errors);
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

  const onSubmit = (values: any) => {
    const emailRegistered = true; // check email exist
    // case valid email
    if (emailRegistered) {
      NavigationService.navigate(Routes.InputPassword, values);
    } else {
      //navigate to OTP for case signup account
      NavigationService.navigate(Routes.OTP, values);
    }
  };

  return (
    <MainLayout bgColor={styles.bgWhite} unsafe>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={Images.background}>
          <View style={styles.p24}>
            <View style={styles.wrapLogo}>
              <ImageCus source={Images.logo} style={styles.boxLogo} />
            </View>
            <View style={styles.cenItem}>
              <TextCus bold title1 useI18n color42>
                auth.login_title
              </TextCus>
              <Divider style={getHeight(8)} />
              <TextCus useI18n caption1 labelColor>
                auth.login_email
              </TextCus>
            </View>
            <View style={getHeight(24)} />
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInputs
                    style={[styles.inputEmail, styles.fs14, styles.fw400]}
                    autoCapitalize="none"
                    placeholder={t('input_email')}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    value={value}
                    onBlur={onBlur}
                    color={Colors.labelColor}
                    leftIcon={
                      <View style={styles.rowItem}>
                        <SvgIcon.Email />
                        <View style={getWidth(20)} />
                      </View>
                    }
                    autoFocus={true}
                    success
                  />
                </>
              )}
            />
            {errors?.email ? (
              <View>
                <TextCus style={styles.fieldTextRequired}>
                  {errors?.email?.message}
                </TextCus>
                <View style={getHeight(20)} />
              </View>
            ) : (
              <View style={getHeight(20)} />
            )}
            <View style={styles.cenItem}>
              <TextCus useI18n caption1 labelColor>
                auth.login_with
              </TextCus>
              <Divider style={getHeight(16)} />
            </View>
            <View style={[styles.flex1, styles.cenItem]}>
              <Buttons
                style={[styles.btFacebook]}
                onPress={() => {}}
                disabled={false}>
                <SvgIcon.Facebook />
                <View style={getWidth(18)} />
                <TextCus useI18n body2 whiteColor semibold>
                  auth.facebook
                </TextCus>
              </Buttons>
              <Divider style={getHeight(24)} />
            </View>
            <View style={[styles.rowItem, styles.cenItemvh, styles.flexWrap]}>
              <TextCus
                regular
                textAlign={'center'}
                style={[styles.lh24, styles.mr2]}
                useI18n>
                agree_by_continue
              </TextCus>
              <TouchCus
                onPress={() => {
                  // openLink('url', EnumTermOfUse[`${i18n.language}`])
                }}>
                <TextCus
                  regular
                  useI18n
                  colore2
                  style={[
                    styles.fs14,
                    styles.lh24,
                    styles.underline,
                    styles.mr2,
                  ]}>
                  term_of_use
                </TextCus>
              </TouchCus>
              <TextCus
                regular
                textAlign={'center'}
                style={[styles.lh24]}
                useI18n>
                application
              </TextCus>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <View
        style={[
          styles.rowItem,
          styles.p24,
          {position: 'absolute', bottom: strExists(keyboardStatus) ? 20 : 285},
        ]}>
        <Buttons
          style={[
            styles.flex1,
            styles.centerItem,
            styles.btnContinue,
            !isDirty || !isValid ? styles.bgDisable : styles.bgValid,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid}>
          <TextCus
            color42
            useI18n
            style={[styles.fs14, styles.fw400, styles.lh24]}>
            continue
          </TextCus>
          <Divider style={getWidth(8)} />
          <SvgIcon.ArrowRight />
        </Buttons>
      </View>
    </MainLayout>
  );
}
