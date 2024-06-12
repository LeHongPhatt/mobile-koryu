import {yupResolver} from '@hookform/resolvers/yup';
import SvgIcon from 'assets/IconSVG';
import {Buttons, MainLayout, TextCus, TextInputs, TouchCus} from 'components';
import {useKey} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {EnumStatusLog, getHeight, getWidth, strExists} from 'utils';
import {validateInputSchema} from 'utils/validate';
import styles from './styles';

export default function InputPassword() {
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid},
  } = useForm<IFormDataLogin>({
    mode: 'onChange',
    resolver: yupResolver(validateInputSchema),
  });
  const {saveKeyStore} = useKey();

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [visible, setVisible] = useState<boolean>(false);

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
    // force login into Home
    saveKeyStore('status', EnumStatusLog.LOGIN);
    NavigationService.navigate(Routes.HomeTabs, values);
  };

  return (
    <MainLayout showAuthHeader bgColor={Colors.white}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.cenItem}>
            <TextCus bold style={[styles.fs24, styles.lh34]} useI18n color42>
              auth.sign_in
            </TextCus>
            <Divider style={getHeight(12)} />
            <TextCus useI18n body2>
              auth.input_password
            </TextCus>
            <Divider style={getHeight(32)} />
          </View>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[
                    styles.inputEmail,
                    styles.fs14,
                    styles.fw400,
                    errors?.password ? styles.borderError : styles.borderInput,
                  ]}
                  autoCapitalize="none"
                  placeholder={t('placeholder.input_password')}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={visible}
                  rightIcon={
                    <TouchCus onPress={() => setVisible(!visible)}>
                      {visible ? <SvgIcon.EyeHide /> : <SvgIcon.EyeShow />}
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styles.rowItem}>
                      <SvgIcon.LockIcon />
                      <View style={getWidth(20)} />
                    </View>
                  }
                  autoFocus={true}
                  success
                />
              </>
            )}
          />
          {errors?.password ? (
            <View>
              <View style={getHeight(8)} />
              <TextCus
                errorColor
                style={[styles.fs12, styles.fw400, styles.lh20]}
                useI18n>
                error.incorrect_password
              </TextCus>
              <View style={getHeight(16)} />
            </View>
          ) : (
            <View style={getHeight(16)} />
          )}
          <TouchCus
            style={styles.cenItem}
            onPress={() => {
              NavigationService.navigate(Routes.OTP);
            }}>
            <TextCus
              style={[styles.fs14, styles.fw500, styles.lh18, styles.textCl16]}
              useI18n>
              text.forgot_password
            </TextCus>
          </TouchCus>
        </View>
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
