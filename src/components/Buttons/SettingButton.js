import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../core/theme';

// Utilisation :
// <SubmitButton orange onPress={yourFunction} style={{ paddingVertical: 40 }} />
export function SubmitButton({
  label = 'Test du label',
  style,
  ...props
}) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        { backgroundColor: orange ? colors.orange : colors.green },
        style,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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

