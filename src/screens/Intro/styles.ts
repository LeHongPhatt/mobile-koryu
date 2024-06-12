import {StyleSheet} from 'react-native';
import {Colors} from 'theme';
import {dimensions, width} from 'utils';
import {getSizing} from 'utils/functions';
const {height} = dimensions;
export default StyleSheet.create({
  nextButton: {
    width: width - getSizing(30),
  },
  buttonContainer: {},
  textWhite: {
    color: '#ffffff',
    fontSize: 15,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 87, 34, .9)',
    borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    paddingBottom: getSizing(66),
    height,
    width,
  },
  viewsct: {
    height: height / 3,
    alignItems: 'center',
    width: '80%',
  },
  image: {
    resizeMode: 'cover',
    width,
    height,
    position: 'relative',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    width: '90%',
    color: '#ffffff',
    textAlign: 'center',
  },
  bgLotie: {flex: 1, backgroundColor: '#FFB901'},
  bottoms: {
    position: 'absolute',
    bottom: 66,
    width,
  },
  ph15: {
    paddingHorizontal: getSizing(15),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowItem: {
    flexDirection: 'row',
  },
  mr14: {
    marginRight: getSizing(14),
  },
  ph16: {
    paddingHorizontal: getSizing(16),
  },
  pv12: {
    paddingVertical: getSizing(12),
  },
  bgBrand: {
    backgroundColor: Colors.brand,
  },
  w100: {
    width: '100%',
  },
  bR51: {
    borderRadius: 51,
  },
  textContinue: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark,
  },
});
