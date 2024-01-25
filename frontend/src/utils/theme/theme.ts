import { purple, blue, green, yellow, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const primary = {
    primary50: '#E0FCFF',
    primary100: '#BEF8FD',
    primary200: '#87EAF2',
    primary300: '#54D1DB',
    primary400: '#38BEC9',
    primary500: '#2CB1BC',
    primary600: '#14919B',
    primary700: '#0E7C86',
    primary800: '#0A6C74',
    primary900: '#044E54'
  };
  
export const secondary = {
    secondary50: '#F0F4F8',
    secondary100: '#D9E2EC',
    secondary200: '#BCCCDC',
    secondary300: '#9FB3C8',
    secondary400: '#829AB1',
    secondary500: '#627D98',
    secondary600: '#486581',
    secondary700: '#334E68',
    secondary800: '#243B53',
    secondary900: '#102A43'
};
  
declare module '@mui/material/styles' {
    interface PaletteOptions {
      primaryPalette?: typeof primary;
      secondaryPalette?: typeof secondary;
    }
  }

type ThemeMode = 'light' | 'dark';

const getTheme = (mode: ThemeMode) => createTheme({
  palette: {
    mode, // 'light' or 'dark'
    primary: {
      main: primary.primary600,
      light: primary.primary400,
      dark: primary.primary800,
      contrastText: mode == 'dark' ? '#fff' : '#000'
    },
    secondary: {
      main: mode === 'dark' ? secondary.secondary800 : secondary.secondary200,
      light: mode === 'dark' ? secondary.secondary600 : secondary.secondary100,
      dark: secondary.secondary900,
    },
    background: {
      default: mode === 'dark' ? secondary.secondary900 : secondary.secondary100,
      paper: mode === 'dark' ? secondary.secondary800 : '#fff'
    },
    error: {
      main: '#BA2525',
      light: '#FACDCD',
      dark: '#A61B1B'
    },
    text: {
      primary: mode === 'dark' ? '#fff' : "#000", // default text color
      secondary: mode === 'dark' ? secondary.secondary100 : secondary.secondary900,
    },
    // adding all the palettes if needed in single cases
    primaryPalette: primary,
    secondaryPalette: secondary
  },
});

  // Create a light theme
const lightTheme = getTheme('light');

// Create a dark theme
const darkTheme = getTheme('dark');

export { lightTheme, darkTheme };
