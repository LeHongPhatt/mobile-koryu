import {yupResolver} from '@hookform/resolvers/yup';
import SvgIcon from 'assets/IconSVG';
import {
  Buttons,
  IconCus,
  MainLayout,
  TextCus,
  TextInputs,
  TouchCus,
} from 'components';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IFormDataLogin} from 'types';
import {getHeight, getWidth, strExists} from 'utils';
import {validatePasswordSchema} from 'utils/validate';
import styles from './styles';

export default function ResetPassword() {
  const {t} = useTranslation();
  const {
    control,
    formState: {errors, isDirty, isValid},
    handleSubmit,
  } = useForm<IFormDataLogin>({
    mode: 'onChange',
    resolver: yupResolver(validatePasswordSchema),
  });
  const {params} = NavigationService.route() || '';

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [visibleItem, setVisibleItem] = useState<any>({});

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

  const toggleVisible = (type: string) => {
    setVisibleItem((prevItem: any) => ({
      ...prevItem,
      [type]: !prevItem[type],
    }));
  };

  const onSubmit = (values: any) => {
    NavigationService.navigate(Routes.KYC, {...values, ...params});
  };

  return (
    <MainLayout showAuthHeader bgColor={Colors.white}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.p24}>
          <View style={styles.wrapLogo}>
            <View style={[styles.wrapTitle, styles.cenItemvh]}>
              <SvgIcon.Lock />
            </View>
            <Divider style={getHeight(12)} />
            <View style={styles.cenItem}>
              <TextCus
                bold
                regular
                color42
                useI18n
                style={[styles.fs24, styles.lh32]}>
                auth.resetpwd_title
              </TextCus>
              <Divider style={getHeight(12)} />
              <TextCus useI18n caption1 labelColor>
                auth.resetpwd_subtitle
              </TextCus>
              <Divider style={getHeight(32)} />
            </View>
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
                    styles.input,
                    styles.fs16,
                    styles.fw400,
                    errors?.password ? styles.borderError : styles.borderInput,
                  ]}
                  autoCapitalize="none"
                  placeholder={t('auth.resetpwd_title')}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={visibleItem?.old}
                  rightIcon={
                    <TouchCus onPress={() => toggleVisible('old')}>
                      {visibleItem?.old ? (
                        <SvgIcon.EyeHide />
                      ) : (
                        <SvgIcon.EyeShow />
                      )}
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styles.rowItem}>
                      <SvgIcon.LockIcon />
                      <View style={getWidth(20)} />
                    </View>
                  }
                  success
                  autoFocus
                />
              </>
            )}
          />
          {errors?.password ? (
            <View>
              <View style={getHeight(8)} />
              <TextCus
                errorColor
                style={[styles.fs12, styles.fw400, styles.lh20]}>
                {errors?.password?.message?.split('.')[0]}
                {`\n`}
                {errors?.password?.message?.split('.')[1]}
              </TextCus>
              <View style={getHeight(16)} />
            </View>
          ) : (
            <View style={getHeight(16)} />
          )}
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <TextInputs
                  style={[styles.input, styles.fs16, styles.fw400]}
                  autoCapitalize="none"
                  placeholder={t('auth.resetpwd_confirm_title')}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  color={Colors.colorLine}
                  secureTextEntry={visibleItem?.confirm}
                  rightIcon={
                    <TouchCus onPress={() => toggleVisible('confirm')}>
                      {visibleItem?.confirm ? (
                        <SvgIcon.EyeHide />
                      ) : (
                        <SvgIcon.EyeShow />
                      )}
                    </TouchCus>
                  }
                  leftIcon={
                    <View style={styles.pr5}>
                      <IconCus
                        style={styles.ml8}
                        name={'lock'}
                        size={18}
                        color={Colors.border}
                      />
                    </View>
                  }
                  success
                />
              </>
            )}
          />
          {errors?.confirmPassword ? (
            <View>
              <View style={getHeight(8)} />
              <TextCus
                errorColor
                style={[styles.fs12, styles.fw400, styles.lh20]}>
                {errors?.confirmPassword?.message}
              </TextCus>
            </View>
          ) : (
            <View style={getHeight(16)} />
          )}
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
