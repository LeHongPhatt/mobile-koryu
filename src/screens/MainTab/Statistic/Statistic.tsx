import {View, Text} from 'react-native';
import React from 'react';
import {HomeLayout} from 'components';
import styles from './styles';

const Statistic = () => {
  return (
    <HomeLayout>
      <View style={styles.container}>
        <Text>Statistic</Text>
      </View>
    </HomeLayout>
  );
};
export default Statistic;
