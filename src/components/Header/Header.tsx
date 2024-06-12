import React, {ReactNode, useEffect} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {NavigationService} from 'navigation';
import {Title, Subheading} from 'react-native-paper';

export function Header(props: IHeader) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleRight,
    styleRightSecond,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    renderLeft,
    renderRightSecond,
    renderRight,
  } = props;

  useEffect(() => {
    const option = 'dark-content';
    StatusBar.setBarStyle(option, true);
  });

  return (
    <View style={[styles.contain, style]}>
      <View style={styles.flex1}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={() =>
            onPressLeft ? onPressLeft() : NavigationService.goBack()
          }>
          {renderLeft && renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        <Title numberOfLines={1} style={[styles.txtDark, styles.headLine]}>
          {title}
        </Title>
        {subTitle && <Subheading>{subTitle}</Subheading>}
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}>
          {renderRightSecond && renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}>
          {renderRight && renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export interface IHeader {
  style?: any;
  styleLeft?: any;
  styleCenter?: any;
  styleRight?: any;
  styleRightSecond?: any;
  renderLeft?: () => ReactNode;
  renderRight?: () => ReactNode;
  renderRightSecond?: () => ReactNode;
  onPressRightSecond?: () => void;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  title?: string;
  subTitle?: string;
  barStyle?: string;
}
