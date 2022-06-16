import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#2A4849',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export const colors = {
  red: 'rgb(176, 65, 62)',
  white: 'white',
  darkGreen: '#2A4849',
  green: '#79B791',
  orange: '#F4A261',
  grey: '#DDDDDD',
  grey2: '#bec6cf',
  grey3: '#86939e',
  mediumGreen: 'rgba(250,250,250,0.10)',
  lightGreen: 'rgba(250,250,250,0.35)',
  disabledText: '#666666',
  black: '#222222'
};

export const general = {
  borderRadius: 5,
  bigBorderRadius: 20,
  fullBorderRadius: '50%',
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
};

export const position = StyleSheet.create({
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  rowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rowSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const font = StyleSheet.create({
  h1: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 37,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },
  desc: {
    fontSize: 13,
    color: colors.grey,
  },
  bold: {
    fontWeight: 'bold',
  },
});
