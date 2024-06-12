import {View, Text} from 'react-native';
import React from 'react';
import {HomeLayout} from 'components';
import styles from './styles';

const Transaction = () => {
  return (
    <HomeLayout>
      <View style={styles.container}>
        <Text>Transaction</Text>
      </View>
    </HomeLayout>
  );
};
export default Transaction;
