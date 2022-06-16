import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../core/theme';

// Utilisation;
// <FilterModalSwitch
//   onPress={onToggleFilterPress}
//   isFavorySelected={isFavorySelected}
//   style={{ marginRight: 5 }}
// />;
export function FilterModalSwitch({ style, isFavorySelected, onPress }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={!isFavorySelected ? onPress : undefined}
        style={[
          styles.buttons,
          styles.recent,
          {
            backgroundColor: isFavorySelected
              ? colors.lightGreen
              : colors.mediumGreen,
          },
        ]}
      >
        <Ionicons name={'time'} size={20} color={colors.white} />
      </Pressable>
      <Pressable
        onPress={isFavorySelected ? onPress : undefined}
        style={[
          styles.buttons,
          styles.favory,
          {
            backgroundColor: isFavorySelected
              ? colors.mediumGreen
              : colors.lightGreen,
          },
        ]}
      >
        <Ionicons name={'star'} size={20} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  recent: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  favory: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
