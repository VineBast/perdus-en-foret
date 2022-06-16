import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../core/theme';

// Utilisation
//<AddPointButton onPress={addPoint} style={{ marginLeft: 5 }} />
export function AddPointButton({ style, ...props }) {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <Image
        style={styles.logo}
        source={require('../../../assets/logos/addButton.svg')}
      />
      <Text style={styles.text}>Ajouter un point</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  logo: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 15,
    lineHeight: 17,
    color: '#222222',
    marginLeft: 5,
  },
});
