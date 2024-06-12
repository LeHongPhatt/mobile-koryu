import React, {ReactNode} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Colors} from 'theme';
import {BaseStyle, DefaultFont} from 'theme/typography';

export function TextInputs(props: ITextInputs) {
  // const cardColor = colors.card;
  const {style, success, leftIcon, rightIcon, textStyle} = props;
  return (
    <View style={[BaseStyle.textInput, style]}>
      {leftIcon}
      <TextInput
        {...props}
        style={[styles.txt, {fontFamily: DefaultFont}, textStyle]}
        selectionColor={success ? Colors.border : Colors.white}
        placeholderTextColor={success ? Colors.border : Colors.white}
      />
      {rightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export interface ITextInputs extends TextInputProps {
  style?: any;
  success?: boolean;
  editable?: boolean;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChangeText?: (text: any) => void;
  onTouchStart?: () => void;
  placeholderTextColor?: string;
  placeholder?: string | undefined;
  value?: string;
  color?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  textStyle?: any;
}
