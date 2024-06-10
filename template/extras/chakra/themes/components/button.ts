import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '20px',
    padding: '10px 20px',
    textTransform: 'capitalize',
  },
  defaultProps: {
    size: 'lg',
  },
  sizes: {
    lg: {
      minW: '140px',
    },
  },
  variants: {
    link: {
      color: 'text.600',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    outline: {
      _active: {
        bg: 'primary.50',
        border: '2px solid',
        color: 'primary.500',
      },
      _hover: {
        bg: 'primary.50',
        border: '2px solid',
        borderColor: 'primary.50',
        color: 'primary.500',
      },
      border: '2px solid',
      borderColor: 'primary.500',
      color: 'primary.500',
    },
    solid: {
      _active: {
        bg: 'primary.50',
        color: 'primary.500',
      },
      _hover: {
        bg: 'primary.50',
        color: 'primary.500',
      },
      bg: 'primary.500',
      color: 'text.50',
    },
  },
});

export default Button;
