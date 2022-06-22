import { StyleSheet, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../core/theme';

export function BackButton({ goBack, white }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Ionicons
        name={'arrow-back'}
        size={30}
        color={white ? colors.white : colors.darkGreen}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    left: 20,
    zIndex: 99999,
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: colors.grey,
  },
  image: {
    width: 24,
    height: 24,
  },
});
