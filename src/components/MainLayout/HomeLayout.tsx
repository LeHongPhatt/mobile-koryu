import {SafeAreaStatusBar, SafeAreaViewCus} from 'components';
import React from 'react';
import {Colors} from 'theme';
import {TmodeContent} from 'types';

const HomeLayout = (props: IMainLayoutProps) => {
  const {children, bgColor, statusBarMode} = props;
  console.log('statusBarMode', statusBarMode);

  return (
    <>
      <SafeAreaViewCus bgColor={bgColor ?? Colors.main}>
        <>
          <SafeAreaStatusBar modeContent={statusBarMode} />
          {/* {showAuthHeader && (
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
        )} */}
          {children}
        </>
      </SafeAreaViewCus>
    </>
  );
};

export default HomeLayout;

export interface IMainLayoutProps {
  children?: React.ReactNode;
  bgColor?: string;
  statusBarMode?: TmodeContent;
}
