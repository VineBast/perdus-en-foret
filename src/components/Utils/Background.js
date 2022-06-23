import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { theme } from '../../core/theme';

export function Background({ children, style }) {
  return (
    <View style={[styles.background, style]}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        {children}
      </KeyboardAvoidingView>
    </View>
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
    justifyContent:
      Platform.OS === 'ios' || Platform.OS === 'android' ? 'center' : '',
  },
});
