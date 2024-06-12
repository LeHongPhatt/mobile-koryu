import {ScrollView, View} from 'react-native';
import React from 'react';
import {Header, HomeLayout} from 'components';
import {Colors} from 'theme';
import styles from './styles';
import {Contact, GroupDriver, SponsoredBy, WalletInfo} from './Components';

const Home = () => {
  return (
    <HomeLayout bgColor={Colors.white} statusBarMode={'dark-content'}>
      <ScrollView style={styles.container}>
        <View>
          <Header />
          <WalletInfo />
          <GroupDriver />
          <SponsoredBy />
          <Contact />
        </View>
      </ScrollView>
    </HomeLayout>
  );
};
export default Home;
