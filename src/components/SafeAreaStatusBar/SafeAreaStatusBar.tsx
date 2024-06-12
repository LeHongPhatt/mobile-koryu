import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {TmodeContent} from 'types';

const SafeAreaStatusBar = ({
  backgroundColor,
  modeContent,
}: ISafeAreaStatusBar) => {
  console.log('backgroundColor', backgroundColor);
  const [mode, setMode] = useState(modeContent ?? 'dark-content');

  useEffect(() => modeContent && setMode(modeContent), [modeContent]);

  return <StatusBar barStyle={mode} />;
};

export interface ISafeAreaStatusBar {
  backgroundColor?: string;
  modeContent?: TmodeContent;
}

export default SafeAreaStatusBar;
