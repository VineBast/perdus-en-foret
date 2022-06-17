import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../core/theme';

// Utilisation
//<AddPointButton onPress={addPoint} style={{ marginLeft: 5 }} />
export function AddPointButton({ style, ...props }) {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <View style={styles.wrapper}>
        <Svg width={30} height={30}>
          <Path fill="#F4A261" d="M12.96 1.897a2.97 2.97 0 0 1 4.08 0 2.97 2.97 0 0 0 2.729.73 2.97 2.97 0 0 1 3.533 2.04A2.97 2.97 0 0 0 25.3 6.666a2.97 2.97 0 0 1 2.04 3.534c-.232.974.043 2 .73 2.728a2.97 2.97 0 0 1 0 4.08 2.97 2.97 0 0 0-.73 2.729 2.97 2.97 0 0 1-2.04 3.534 2.97 2.97 0 0 0-1.998 1.997 2.97 2.97 0 0 1-3.534 2.04 2.97 2.97 0 0 0-2.728.731 2.97 2.97 0 0 1-4.08 0 2.97 2.97 0 0 0-2.729-.73 2.97 2.97 0 0 1-3.533-2.041A2.97 2.97 0 0 0 4.7 23.27a2.97 2.97 0 0 1-2.04-3.534 2.97 2.97 0 0 0-.73-2.728 2.97 2.97 0 0 1 0-4.08 2.97 2.97 0 0 0 .73-2.73A2.97 2.97 0 0 1 4.7 6.666a2.97 2.97 0 0 0 1.998-1.997 2.97 2.97 0 0 1 3.534-2.04c.974.232 2-.043 2.728-.731z"/>
          <Path fill="#fff" d="M15 9a.857.857 0 0 1 .857.857v4.286h4.286a.857.857 0 1 1 0 1.714h-4.286v4.286a.857.857 0 1 1-1.714 0v-4.286H9.857a.857.857 0 0 1 0-1.714h4.286V9.857A.857.857 0 0 1 15 9z"/>
        </Svg>
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
