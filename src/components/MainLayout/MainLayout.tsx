import SvgIcon from 'assets/IconSVG';
import {Header, IconCus, SafeAreaStatusBar, SafeAreaViewCus} from 'components';
import React from 'react';

const MainLayout = (props: IMainLayoutProps) => {
  const {children, showAuthHeader, titleAuthHeader, bgColor, unsafe} = props;

  return (
    <>
      {unsafe ? (
        <>
          <SafeAreaStatusBar />
          {showAuthHeader && (
            <Header
              title={titleAuthHeader ?? ''}
              renderLeft={() => (
                <IconCus
                  name={'chevron-left'}
                  size={18}
                  // color={Colors.white}
                />
              )}
            />
          )}
          {children}
        </>
      ) : (
        <SafeAreaViewCus bgColor={bgColor}>
          <>
            <SafeAreaStatusBar />
            {showAuthHeader && (
              <Header
                style={{backgroundColor: bgColor}}
                title={titleAuthHeader ?? ''}
                renderLeft={() => <SvgIcon.ArrowBack />}
              />
            )}
            {children}
          </>
        </SafeAreaViewCus>
      )}
    </>
  );
};

export default MainLayout;

export interface IMainLayoutProps {
  children?: React.ReactNode;
  statusBar?: any;
  showAuthHeader?: boolean;
  titleAuthHeader?: string;
  style?: any;
  bgColor?: any;
  edges?: any;
  testID?: string;
  unsafe?: boolean;
}
