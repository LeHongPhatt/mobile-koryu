import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {dimensions} from 'utils';
const isIos = Platform.OS === 'ios';
const {width} = dimensions;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  bgColorDA: {
    backgroundColor: Colors.colorDA,
  },
  wrapLogo: {
    alignItems: 'center',
    marginTop: 8,
    minHeight: 200,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  boxLogo: {
    width: 250,
    height: 250,
  },
  main: {padding: 24, flex: 1},
  rowItem: {
    flexDirection: 'row',
  },
  spaceItem: {
    justifyContent: 'space-between',
  },
  topU10: {
    top: -15,
  },
  cenItem: {
    alignItems: 'center',
  },
  endItem: {
    justifyContent: 'flex-end',
  },
  cenItemvh: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCondition: {
    alignContent: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  btnActive: {
    backgroundColor: Colors.mainLight,
  },
  btlogi: {
    backgroundColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.transparent,
    height: 56,
  },
  btlog: {
    marginTop: 30,
    backgroundColor: Colors.info,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  txtdn: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  inputOTP: {
    borderRadius: 0,
    borderBottomWidth: 2,
    marginBottom: 24,
    maxWidth: (width - 48) / 6 - 10,
    paddingHorizontal: 16,
    fontSize: 24,
  },
  otpValid: {
    borderBottomColor: Colors.color42,
    color: Colors.dark,
  },
  otpInvalid: {
    borderBottomColor: Colors.errorColor,
    color: Colors.errorColor,
  },
  form: {
    marginBottom: isIos ? 70 : 40,
    alignItems: 'flex-start',
  },
  fieldTextRequired: {
    color: Colors.error,
    textAlign: 'left',
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  mr10: {
    marginRight: 10,
  },
  mr24: {
    marginRight: 24,
  },
  fontRoboto: {
    fontFamily: 'Roboto',
  },
  fw400: {
    fontWeight: '400',
  },
  fw500: {
    fontWeight: '500',
  },
  fs24: {
    fontSize: 24,
  },
  lh32: {
    lineHeight: 32,
  },
  lh34: {
    lineHeight: 34,
  },
  fs10: {
    fontSize: 10,
  },
  fs12: {
    fontSize: 12,
  },
  fs14: {
    fontSize: 14,
  },
  fs16: {
    fontSize: 16,
  },
  lh13: {
    lineHeight: 13,
  },
  lh18: {
    lineHeight: 18,
  },
  lh20: {
    lineHeight: 20,
  },
  lh22: {
    lineHeight: 22,
  },
  lh24: {
    lineHeight: 24,
  },
  text74: {
    color: Colors.text74,
  },
  flex1: {
    flex: 1,
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  mt24: {
    marginTop: 24,
  },
  mt1: {
    paddingTop: 1,
  },
  ml24: {
    marginLeft: 24,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    height: 34,
    marginBottom: isIos ? 20 : 40,
  },
  m24: {
    margin: 24,
  },
  ml8: {
    marginLeft: 8,
  },
  textHotline: {
    color: Colors.colorDc,
  },
  w100: {
    width: '100%',
  },
  mr8: {
    marginRight: 8,
  },
  mr2: {
    marginRight: 2,
  },
  textWhite: {
    color: Colors.white,
  },
  textRed: {
    color: Colors.colorDA,
  },
  fw600: {
    fontWeight: '600',
  },
  fw700: {
    fontWeight: '700',
  },
  p5: {
    padding: 5,
  },
  p24: {
    padding: 24,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  fontMonserat: {
    fontFamily: 'Montserrat',
  },
  bgDisable: {
    backgroundColor: Colors.border,
  },
  btnContinue: {
    backgroundColor: Colors.blueColor,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: Colors.transparent,
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bgValid: {
    backgroundColor: Colors.brand,
  },
  textCl16: {
    color: Colors.color16B,
  },
  textError: {
    color: Colors.errorColor,
  },
});
