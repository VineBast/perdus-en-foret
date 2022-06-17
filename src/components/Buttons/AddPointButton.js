import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../core/theme';

// Utilisation
//<AddPointButton onPress={addPoint} style={{ marginLeft: 5 }} />
export function AddPointButton({ style, ...props }) {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <View style={styles.wrapper}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logos/addButton.svg')}
        />
        <Text style={styles.text}>Ajouter un point</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto'
  },
  wrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 50,
    padding: 4,
    paddingRight: 14
  },
  logo: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 15,
    color: '#222222',
    marginLeft: 5,
  },
});
