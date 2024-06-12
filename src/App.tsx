// import Toast from 'react-native-toast-message';
import {SafeAreaStatusBar} from 'components';
import i18n from 'i18n';
import {Navigator} from 'navigation';
import React, {Suspense} from 'react';
import {I18nextProvider} from 'react-i18next';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {configStore} from 'store/createStore';
// import * as AppActions from 'store/app';

const {persistor, store} = configStore();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaStatusBar backgroundColor="transparent" />
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={null}>
              <PersistGate loading={null} persistor={persistor}>
                <Navigator />
                <Toast />
              </PersistGate>
            </Suspense>
          </I18nextProvider>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
