import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextCus, TouchCus} from 'components';
import {getHeight, getWidthBySpace} from 'utils';
import Icon from 'assets/svg/Icon';
const WalletInfo = () => {
  return (
    <View style={styles.container}>
      <View style={getHeight(12)} />
      <TextCus mainLightColor body1 useI18n>
        hi
      </TextCus>
      <View style={getHeight(14)} />
      <View
        style={[
          styles.radius4,
          styles.borderWallet,
          styles.p12,
          styles.row,
          styles.spaceItem,
        ]}>
        <TextCus body1>Khả dụng</TextCus>
        <View style={[styles.row, styles.spaceItem, styles.cenItem]}>
          <TextCus title3 bold style={styles.mr8}>
            0
          </TextCus>
          <View style={styles.mr8}>
            <Icon.ExcCoin />
          </View>
          <TextCus body1>EXC-xu</TextCus>
        </View>
      </View>
      <View
        style={[
          styles.wrapAction,
          styles.radius4,
          styles.p12,
          styles.cenItemvh,
        ]}>
        <View style={[styles.row, styles.spaceItem, getWidthBySpace(64)]}>
          <TouchCus style={styles.cenItemvh} onPress={() => {}}>
            <Icon.Wallet />
            <TextCus body2 whiteColor>
              Nạp EXC-xu
            </TextCus>
          </TouchCus>
          <TouchCus style={styles.cenItemvh} onPress={() => {}}>
            <Icon.Refered />
            <TextCus body2 whiteColor>
              Giới thiệu
            </TextCus>
          </TouchCus>
          <TouchCus style={styles.cenItemvh} onPress={() => {}}>
            <Icon.Request />
            <TextCus body2 whiteColor>
              Gửi yêu cầu
            </TextCus>
          </TouchCus>
        </View>
      </View>
    </View>
  );
};
export default WalletInfo;
