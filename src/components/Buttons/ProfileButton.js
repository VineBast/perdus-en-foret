import { Pressable, StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { colors } from '../../core/theme';
import { Ionicons } from '@expo/vector-icons';

export function ProfileButton({
  name,
  tel,
  mail,
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
    ><Image
      style={{ width: 60, height: 60, borderRadius: 60 }}
      source={{ uri: "https://docs.ypariset.fr/img/default-avatar.jpeg" }}
    /><View>
        <Text style={[styles.textName,  {fontWeight: 'bold'}]}>{name}</Text>
        <Text style={styles.text}>{mail}</Text>
        <Text style={styles.text}>{tel}</Text>
    </View>
    <View style={{marginTop: 20}}>
      <Ionicons name={'chevron-forward-outline'} size={20} color={colors.green}></Ionicons>
      </View>
    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    flex: 1,
    justifyContent:'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    borderRadius: 6,
  },
  text: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'left',
  },
  textName: {
    fontSize: 19,
    color: colors.white,
    textAlign: 'left',
  },
});

