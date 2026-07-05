import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { typography, TypographyVariant } from '../../theme';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * The single text primitive. Every string in the UI renders through here so
 * typography stays consistent and centralised in the theme.
 */
export const AppText = ({
  variant = 'body',
  color,
  style,
  ...rest
}: AppTextProps) => (
  <Text
    style={[typography[variant], color ? { color } : null, style]}
    {...rest}
  />
);
