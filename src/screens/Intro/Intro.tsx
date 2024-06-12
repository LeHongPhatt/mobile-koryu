import AsyncStorage from '@react-native-community/async-storage';
import {Images} from 'assets';
import SvgIcon from 'assets/IconSVG';
import {useKey} from 'hooks';
import LottieView from 'lottie-react-native';
import {NavigationService, Routes} from 'navigation';
import React, {useEffect, useRef, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {EnumStatusLog, getHeight, slidesIntro} from 'utils';
import styles from './styles';

const Intro = () => {
  const {getKeyStore} = useKey();
  const [showRealApp, setshowRealApp] = useState(false);
  const [checkintro, setcheckintro] = useState('');
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    _retrieveData();
  }, []);

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('CHECKINTRO', 'Y');
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const valueTK = await AsyncStorage.getItem('CHECKINTRO');
      valueTK && setcheckintro(valueTK);
    } catch (error) {
      // Error retrieving data
    }
  };

  const _onNext = (index: number) => {
    console.log('showRealApp', showRealApp);
    if (index < slidesIntro.length - 1) {
      // use function next slide
      sliderRef?.current?.goToSlide(index + 1);
      setActiveDot(activeDot + 1);
    } else {
      // use function onDone
      _onDone();
    }
  };

  const _renderItem = ({index, item}: any) => {
    return (
      <View style={styles.slide}>
        <ImageBackground source={item.image} style={styles.image}>
          <View style={[styles.bottoms, styles.ph15, styles.center]}>
            <View style={getHeight(24)} />
            <View style={[styles.rowItem]}>
              {slidesIntro.map((itm: any, idx: number) => {
                return (
                  <View
                    key={itm?.index}
                    style={idx !== slidesIntro.length && styles.mr14}>
                    {activeDot === idx ? (
                      <SvgIcon.DotActive />
                    ) : (
                      <SvgIcon.DotInActive />
                    )}
                  </View>
                );
              })}
            </View>
            <View style={getHeight(24)} />
            <TouchableOpacity
              onPress={() => _onNext(index)}
              style={[
                styles.ph16,
                styles.pv12,
                styles.bgBrand,
                styles.w100,
                styles.center,
                styles.bR51,
              ]}>
              <Text style={styles.textContinue}>
                {index !== slidesIntro.length - 1 ? 'Tiêp' : 'Bắt đầu ngay'}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    _storeData();
    setshowRealApp(true);
    NavigationService.replace(Routes.Login);
  };

  const checkLogin = async () => {
    const logged = await getKeyStore('status');
    if (logged && logged === EnumStatusLog.LOGIN) {
      NavigationService.replace(Routes.HomeTabs);
    } else {
      NavigationService.replace(Routes.Login);
    }
  };

  return checkintro !== 'Y' ? (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slidesIntro}
      onDone={_onDone}
      renderPagination={() => null}
      onSlideChange={(index: number) => setActiveDot(index)}
      ref={sliderRef}
    />
  ) : (
    <View style={styles.bgLotie}>
      <LottieView
        source={Images.splash}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={checkLogin}
      />
    </View>
  );
};

export default Intro;
