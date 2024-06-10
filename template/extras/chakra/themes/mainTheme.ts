/* eslint-disable sort-keys/sort-keys-fix */
import { extendTheme } from '@chakra-ui/react';
import { Button, Heading, Text } from './components';
import { colors } from './colors';

export const screenBreakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

export const mainTheme = extendTheme({
  colors,
  breakpoint: screenBreakpoints,
  components: {
    Button,
    Heading,
    Text,
  },
  textStyles: {
    footer: {
      fontFamily: 'Poppins',
      fontSize: ['12px', '14px'],
      fontWeight: 500,
      lineHeight: '20px',
    },
    h2: {
      fontFamily: 'Poppins',
      fontSize: ['24px', '36px'],
      fontWeight: 600,
      lineHeight: '160%',
    },
    h4: {
      fontFamily: 'Poppins',
      fontSize: ['16px', '24px'],
      fontWeight: 400,
      lineHeight: '100%',
    },
    link: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '130%',
    },
    paragraph: {
      fontFamily: 'Poppins',
      fontSize: ['14px', '20px'],
      fontWeight: 400,
      lineHeight: '160%',
    },
    policyHeader: {
      fontFamily: 'Poppins',
      fontSize: ['16px', '20px'],
      fontWeight: 600,
      lineHeight: '100%',
    },
    smallParagraph: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '140%',
    },
  },
});
