import Failure from './svg/failure.svg';
import Icon from './svg/Icon';
import Logo from './svg/logo.svg';
import Other from './svg/Other';
import Success from './svg/success.svg';
import SvgFile from './svg/SvgFile';
import TabBar from './svg/TabBar';

const SvgIcon = {
  ...SvgFile,
  ...TabBar,
  ...Icon,
  ...Other,
  ...Logo,
  ...Success,
  ...Failure,
};

export default SvgIcon;
