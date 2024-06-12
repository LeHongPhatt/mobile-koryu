import {HomeLayout, TextCus, TouchCus} from 'components';
import {useKey} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import React from 'react';
import {View} from 'react-native';
import {EnumStatusLog} from 'utils';
import styles from './styles';

const Account = () => {
  const {saveKeyStore} = useKey();
  const onLoggout = () => {
    saveKeyStore('status', EnumStatusLog.LOGOUT);
    NavigationService.navigate(Routes.Login);
  };
  return (
    <HomeLayout>
      <View style={styles.container}>
        <TouchCus style={styles.cenItem} onPress={() => onLoggout()}>
          <TextCus
            style={[styles.fs14, styles.fw500, styles.lh18, styles.textCl16]}
            useI18n>
            button.logout
          </TextCus>
        </TouchCus>
      </View>
    </HomeLayout>
  );
};
export default Account;
