import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {Typography} from 'theme/typography';

export default StyleSheet.create({
  contain: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.main,
  },
  flex1: {flex: 1},
  headLine: {
    ...Typography.title2,
  },
  txtWhiteUp: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  txtDark: {
    color: Colors.dark,
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: 60,
    marginLeft: 14,
  },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
