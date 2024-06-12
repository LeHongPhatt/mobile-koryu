import {StyleSheet} from 'react-native';
import {Colors} from 'theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgTab,
  },
  delivery: {
    position: 'absolute',
    top: -22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
