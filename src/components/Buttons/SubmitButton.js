import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../core/theme';

// Utilisation :
// <SubmitButton orange onPress={yourFunction} style={{ paddingVertical: 40 }} />
export function SubmitButton({
  label = 'Test du label',
  style,
  orange,
  disabled = false,
  ...props
}) {
  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.grey : '' },
        {
          backgroundColor:
            disabled
              ? colors.grey2
              : orange
                ? colors.orange
                : colors.green
        },
        style
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 22,
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 18,
    color: colors.white,
    textAlign: 'center',
  },
});

