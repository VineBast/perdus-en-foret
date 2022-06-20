import { Pressable, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { colors } from '../../core/theme';
import { Ionicons } from '@expo/vector-icons';

export function SettingButton({
  label = 'Test du label',
  style,
  ...props
}) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[
        styles.pressable,  
        style,
      ]}
    >
    <View style={{ width: 25, height: 25, borderRadius: 6, backgroundColor:colors.yellow, justifyContent:'center', alignItems:'center' }}>
        <Ionicons name={'star'} size={15} color={colors.white}></Ionicons>
    </View>
      <Text style={styles.text}>{label}</Text>
      <Ionicons name={'chevron-forward-outline'} size={20} color={colors.green}></Ionicons>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent:'space-between',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    borderTopWidth: 0.5,
    borderColor: colors.darkGreen,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});

