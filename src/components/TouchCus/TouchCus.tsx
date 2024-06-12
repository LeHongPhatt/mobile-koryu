import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

export function TouchCus(props: ITextInputs) {
  const {onPress, style, ...rest} = props;
  return (
    <TouchableOpacity onPress={onPress} style={style} {...rest}>
      {props.children}
    </TouchableOpacity>
  );
}

export interface ITextInputs {
  style?: any;
  children: ReactNode;
  onPress: () => void;
  activeOpacity?: number;
  hitSlop?: any;
}
