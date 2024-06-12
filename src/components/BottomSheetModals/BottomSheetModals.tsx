import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import {Buttons, TextCus} from 'components';
import React, {ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import {getHeight} from 'utils';
import styles from './styles';

const BottomSheetModals = (props: IBottomSheetModals) => {
  const {
    children,
    onClose,
    title,
    subtitle,
    onOk,
    type,
    titleBtn,
    appName,
    snapPoint = ['2%', '50%'],
  } = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => snapPoint, [snapPoint]);
  const [index, setIndex] = useState(1);
  // callbacks
  const handleSheetChanges = useCallback((i: number) => {
    setIndex(i);
    i === 0 && setTimeout(() => onClose?.(), 200);
  }, []);
  const IcNoti = Icon?.[type];
  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        handleIndicatorStyle={styles.hidden}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          {/* <ImageCus source={Images[type]} style={styles.boxLogo} /> */}
          {IcNoti && <IcNoti />}
          <Divider style={getHeight(16)} />
          {title && (
            <View>
              <TextCus style={[styles.textCl16, styles.fs24, styles.lh32]} bold>
                {title}
              </TextCus>
              <View style={getHeight(10)} />
            </View>
          )}
          {subtitle && (
            <View>
              <TextCus textAlign={'center'} body2 labelColor>
                {subtitle}
              </TextCus>
              <View style={getHeight(5)} />
              <TextCus textAlign={'center'} semibold color42>
                {appName}
              </TextCus>
            </View>
          )}
          {children}
          {onOk && (
            <Buttons
              style={[styles.btlogi, styles.btnActive]}
              onPress={() => {
                setIndex(0);
                onOk?.();
                setTimeout(() => onClose?.(), 300);
              }}
              disabled={false}>
              <TextCus whiteColor semibold style={[styles.fs16, styles.lh24]}>
                {titleBtn}
              </TextCus>
            </Buttons>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export interface IBottomSheetModals {
  type: 'success' | 'failure';
  style?: any;
  title?: string;
  titleBtn?: string;
  subtitle?: string;
  children?: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
  appName?: string;
  snapPoint?: any;
}

export default BottomSheetModals;
