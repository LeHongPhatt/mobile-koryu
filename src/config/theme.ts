import {useSelector} from 'react-redux';
import {useDarkMode} from 'react-native-dark-mode';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  grayColor: '#9B9B9B',
  grayPlaceHolder: '#8497a6',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  labelWhiteColor: '#454749',
  desWhiteColor: '#696969',
  blackColor: '#000000',
  fieldColor: '#F5F5F5',
  bgContainer: '#f6f9fa',
  yellowColor: '#FDC60A',
  titleOrangeColor: '#f48221',
  navyBlue: '#3C5A99',
  kashmir: '#5D6D7E',
  orangeColor: '#eb2329',
  blueColor: '#5DADE2',
  infoColor: '#00BFFF',
  bgButtonColorGrey: '#ffffff40',
  bgButtonSelectedColorGrey: '#e3e3e3',
  pinkColor: '#A569BD',
  greenColor: '#58D68D',
  bgTransparentBlack59: '#00000059',
  bgTransparentBlack: '#00000000',
};

/**
 * Define Const list theme use for whole application
 */
export const ThemeSupport = [
  {
    theme: 'orange',
    light: {
      dark: false,
      colors: {
        primary: '#eb2329',
        primaryDark: '#C31C0D',
        primaryLight: '#FF8A65',
        accent: '#4A90A4',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#eb2329',
        primaryDark: '#C31C0D',
        primaryLight: '#FF8A65',
        accent: '#4A90A4',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'pink',
    light: {
      dark: false,
      colors: {
        primary: '#A569BD',
        primaryDark: '#C2185B',
        primaryLight: '#F8BBD0',
        accent: '#8BC34A',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#A569BD',
        primaryDark: '#C2185B',
        primaryLight: '#F8BBD0',
        accent: '#8BC34A',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'blue',
    light: {
      dark: false,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'green',
    light: {
      dark: false,
      colors: {
        primary: '#58D68D',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#58D68D',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'yellow',
    light: {
      dark: false,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
];

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  theme: 'orange',
  light: {
    dark: false,
    colors: {
      primary: '#eb2329',
      primaryDark: '#C31C0D',
      primaryLight: '#FF8A65',
      accent: '#4A90A4',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#eb2329',
      primaryDark: '#C31C0D',
      primaryLight: '#FF8A65',
      accent: '#4A90A4',
      background: '#010101',
      card: '#121212',
      text: '#e5e5e7',
      border: '#272729',
      primaryRed: '#eb2329',
    },
  },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = ['Raleway', 'Roboto', 'Merriweather'];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Roboto';

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const isDarkMode = useDarkMode();
  const forceDark = useSelector(state => state?.application?.force_dark);
  const themeStorage = useSelector(state => state.application.theme);
  const listTheme = ThemeSupport.filter(item => item.theme === themeStorage);
  const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

  if (forceDark) {
    return {theme: theme.dark, colors: theme.dark.colors};
  }
  if (!forceDark) {
    return {theme: theme.light, colors: theme.light.colors};
  }
  return isDarkMode
    ? {theme: theme.dark, colors: theme.dark.colors}
    : {theme: theme.light, colors: theme.light.colors};
};

/**
 * export font for application
 * @returns font
 */
export const useFont = () => {
  const font = useSelector(state => state.application.font);
  return font ?? DefaultFont;
};
