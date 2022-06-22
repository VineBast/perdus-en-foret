import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { theme } from '../../core/theme';

export function Background({ children, style }) {
  return (
    <ImageBackground
      source={require('../../../assets/background_dot.png')}
      resizeMode='repeat'
      style={[styles.background, style]}
    >
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
