import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export function Title(props) {
  return <Text style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 12,
    marginLeft: 10
  },
});
