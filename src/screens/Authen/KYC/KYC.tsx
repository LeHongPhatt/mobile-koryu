import {yupResolver} from '@hookform/resolvers/yup';
import SvgIcon from 'assets/IconSVG';
import {
  BottomSheetModals,
  Buttons,
  IconCus,
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
import {Keyboard, ScrollView, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Divider} from 'react-native-paper';
import {Colors} from 'theme';
import {IUserKYC} from 'types';
import {getHeight, getWidth, strExists} from 'utils';
import {validateFormInforSchema} from 'utils/validate';
import styles from './styles';

export default function KYC() {
  const {t} = useTranslation();
  const {
    control,
    formState: {errors, isDirty, isValid},
    setValue,
    handleSubmit,
  } = useForm<IUserKYC>({
    mode: 'onChange',
    resolver: yupResolver(validateFormInforSchema),
  });
  const {params} = NavigationService.route() || '';
  console.log('KYC====================================');
  console.log(params);
  console.log('====================================');

  const [showModal, setShowModal] = useState(false);
  const [imageList, setImageList] = useState<any>({});

  const [keyboardStatus, setKeyboardStatus] = useState('');

  const selectFile = async (key: string) => {
    const result = await ImagePicker.openPicker({
      multiple: false,
    });
    console.log('result.selectFile', result);
    setImageList({...imageList, [`${key}`]: result});
  };

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
    if (params?.email) {
      setValue('email', params?.email);
    }
  }, [params?.email]);

  const onSubmit = (values: any) => {
    console.log('values.onSubmit', values);
    setShowModal(true);
  };

  return (
    <>
      <MainLayout
        showAuthHeader
        titleAuthHeader={'Thông tin cá nhân'}
        bgColor={Colors.white}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.p22}>
            <View style={styles.wrapLogo}>
              <View style={[styles.wrapTitle, styles.cenItemvh]}>
                {imageList?.avatar ? (
                  <ImageCus
                    style={[styles.wrapTitle, styles.h100]}
                    source={{uri: `${imageList?.avatar.path}`}}
                  />
                ) : (
                  <IconCus name={'camera'} size={18} color={Colors.white} />
                )}
                <TouchCus
                  onPress={() => selectFile('avatar')}
                  style={[
                    styles.posBtnTitle,
                    styles.posAbsolute,
                    styles.wrapBtnTitle,
                    styles.cenItemvh,
                  ]}>
                  <IconCus name={'camera'} size={12} color={Colors.white} />
                </TouchCus>
              </View>
              <Divider style={getHeight(32)} />
            </View>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <View style={[styles.rowItem]}>
                    <TextCus
                      caption1
                      useI18n
                      style={[styles.textDark, styles.lh20]}>
                      information.name
                    </TextCus>
                    <TextCus errorColor caption1>
                      *
                    </TextCus>
                  </View>
                  <TextInputs
                    style={[styles.input, styles.fs16, styles.fw400]}
                    autoCapitalize="none"
                    placeholder={t('placeholder.name') ?? '' ?? ''}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    color={Colors.colorLine}
                    autoFocus={true}
                    success
                  />
                </>
              )}
            />
            {errors?.name ? (
              <View>
                <View style={getHeight(4)} />
                <TextCus
                  errorColor
                  style={[styles.fs12, styles.fw400, styles.lh20]}>
                  {errors?.name?.message}
                </TextCus>
                <View style={getHeight(16)} />
              </View>
            ) : (
              <View style={getHeight(16)} />
            )}
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <View style={[styles.rowItem]}>
                    <TextCus
                      caption1
                      useI18n
                      style={[styles.textDark, styles.lh20]}>
                      information.email
                    </TextCus>
                    <TextCus errorColor>*</TextCus>
                  </View>
                  <TextInputs
                    style={[styles.inputDisable, styles.fs16, styles.fw400]}
                    autoCapitalize="none"
                    placeholder={t('placeholder.email') ?? ''}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    color={Colors.colorLine}
                    success
                    editable={false}
                  />
                </>
              )}
            />
            <View style={getHeight(16)} />
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              rules={{
                required: false,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <View style={[styles.rowItem]}>
                    <TextCus
                      caption1
                      useI18n
                      style={[styles.textDark, styles.lh20]}>
                      information.phone
                    </TextCus>
                  </View>
                  <TextInputs
                    style={[styles.input, styles.fs16, styles.fw400]}
                    autoCapitalize="none"
                    placeholder={t('placeholder.phone') ?? ''}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    value={value}
                    onBlur={onBlur}
                    color={Colors.colorLine}
                    success
                  />
                </>
              )}
            />
            {errors?.phone ? (
              <View>
                <View style={getHeight(4)} />
                <TextCus
                  errorColor
                  style={[styles.fs12, styles.fw400, styles.lh20]}>
                  {errors?.phone?.message}
                </TextCus>
                <View style={getHeight(16)} />
              </View>
            ) : (
              <View style={getHeight(16)} />
            )}
            <Controller
              control={control}
              name="birthday"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <View style={[styles.rowItem]}>
                    <TextCus>Sinh nhật</TextCus>
                  </View>
                  <TextInputs
                    style={[styles.input, styles.fs16, styles.fw400]}
                    autoCapitalize="none"
                    placeholder={t('dd/mm/yyyy') ?? ''}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    color={Colors.colorLine}
                    success
                  />
                </>
              )}
            />
          </View>
        </ScrollView>
        <View
          style={[
            styles.rowItem,
            styles.p24,
            {
              position: 'absolute',
              bottom: strExists(keyboardStatus) ? 20 : 285,
            },
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
      {showModal && (
        <BottomSheetModals
          type="success"
          onOk={() => {}}
          onClose={() => {
            NavigationService.navigate(Routes.HomeTabs);
            setShowModal(false);
          }}
          titleBtn="Bắt đầu ngay"
          title="Đăng ký thành công"
          subtitle="Chào mừng bạn đã đến và trải nghiệm cùng"
          appName="Koryu"
          snapPoint={['2%', '40%']}
        />
      )}
    </>
  );
}
