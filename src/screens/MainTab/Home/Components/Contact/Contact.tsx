import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextCus} from 'components';

const Contact = () => {
  return (
    <View style={styles.container}>
      <TextCus mainLightColor>Chào bạn</TextCus>
    </View>
  );
};
export default Contact;
