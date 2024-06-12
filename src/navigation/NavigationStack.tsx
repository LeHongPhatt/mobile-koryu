import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SvgIconNew from 'assets/IconSVG';
import {TextCus} from 'components';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import * as Screens from 'screens';
import styles from 'screens/MainTab/Statistic/styles';
import {Colors} from 'theme';
import {navigationRef} from './NavigationService';
import {Routes} from './Routes';

const TABBAR_SCREEN = [
  {
    name: 'Home',
    component: Screens.Home,
    textLabel: 'bottom.home',
    tabBarIcon: ({focused}: any) => {
      return focused ? (
        <SvgIconNew.Home color={Colors.brand} />
      ) : (
        <SvgIconNew.Home color={Colors.border} />
      );
    },
  },
  {
    name: 'Chats',
    component: Screens.Chats,
    textLabel: 'bottom.chat',
    tabBarIcon: ({focused}: any) => {
      return focused ? (
        <SvgIconNew.Chat color={Colors.brand} />
      ) : (
        <SvgIconNew.Chat color={Colors.border} />
      );
    },
  },
  {
    name: 'Delivery',
    component: Screens.Statistic,
    textLabel: 'bottom.delivery',
    tabBarIcon: () => {
      return (
        <View style={styles.delivery}>
          <SvgIconNew.Scan />
        </View>
      );
    },
  },
  {
    name: 'Notification',
    component: Screens.Transaction,
    textLabel: 'bottom.notification',
    tabBarIcon: ({focused}: any) => {
      return focused ? (
        <SvgIconNew.Label color={Colors.brand} />
      ) : (
        <SvgIconNew.Label color={Colors.border} />
      );
    },
  },
  {
    name: 'Account',
    component: Screens.Account,
    textLabel: 'bottom.account',
    tabBarIcon: ({focused}: any) => {
      return focused ? (
        <SvgIconNew.Account color={Colors.brand} />
      ) : (
        <SvgIconNew.Account color={Colors.border} />
      );
    },
  },
];

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.brand,
        tabBarInactiveTintColor: Colors.labelColor,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 86,
        },
        headerShown: false,
      }}>
      {TABBAR_SCREEN?.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item?.name}
          component={item?.component}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarLabel: ({color}) => (
              <TextCus
                caption1
                useI18n
                style={{
                  color,
                }}>
                {item?.textLabel}
              </TextCus>
            ),
            tabBarIcon: item?.tabBarIcon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

/**
 * @description define stack navigator when the user has not been authenticated
 * @returns {any}
 */
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Intro} component={Screens.Intro} />
    <Stack.Screen name={Routes.Login} component={Screens.Login} />
    <Stack.Screen name={Routes.OTP} component={Screens.OTP} />
    <Stack.Screen name={Routes.KYC} component={Screens.KYC} />
    <Stack.Screen
      name={Routes.InputPassword}
      component={Screens.InputPassword}
    />
    <Stack.Screen
      name={Routes.ResetPassword}
      component={Screens.ResetPassword}
    />
    <Stack.Screen name={Routes.Register} component={Screens.Register} />
    <Stack.Screen name={Routes.HomeTabs} component={HomeTabs} />
    <Stack.Screen name={Routes.ResearchFn} component={Screens.ResearchFn} />
  </Stack.Navigator>
);

/**
 * @description define stack navigator when the user has authenticated
 * @returns {any}
 */
// const AuthNavigator = () => (
//   <Stack.Navigator
//     initialRouteName={Routes.Home}
//     screenOptions={{headerShown: false}}>
//     <Stack.Screen name={Routes.Home} component={Screens.Home} />
//   </Stack.Navigator>
// );

/**
 * @description define the navigator container check whether the user is authenticated or not
 * @returns {any}
 */
export const Navigator = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    setLoading(false);
    // }, 2000);
  }, []);

  if (loading) {
    return <Screens.Intro />;
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};
