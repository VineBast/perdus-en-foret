import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'react-native-elements';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../core/theme';

export function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        theme={{ colors: { text: '#000000' } }}
        selectionColor={colors.darkGreen}
        underlineColor='transparent'
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey4
  },
  description: {
    fontSize: 13,
    color: colors.white,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
