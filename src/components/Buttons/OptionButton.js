import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../core/theme';
import { getUser, logout } from '../../services/firebase';

export function OptionButton({ navigation }) {
  const [optionOpen, setOptionOpen] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const renderOptions = () => {
    if (optionOpen) {
      return user ? (
        <>
          <Pressable
            onPress={() => navigation.navigate('SettingsScreen')}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'settings'} size={20} color={colors.darkGreen} />
          </Pressable>
          <Pressable style={[style.buttonRounded, style.smallButton]}>
            <Ionicons name={'share'} size={20} color={colors.darkGreen} />
          </Pressable>
          <Pressable style={[style.buttonRounded, style.smallButton]}>
            <Ionicons name={'print'} size={20} color={colors.darkGreen} />
          </Pressable>
          <Pressable style={[style.buttonRounded, style.smallButton]}>
            <Ionicons name={'star'} size={20} color={colors.darkGreen} />
          </Pressable>
          <Pressable
            onPress={() => logout(navigation)}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'log-out'} size={20} color={colors.darkGreen} />
          </Pressable>
        </>
      ) : (
        <>
          <Pressable style={[style.buttonRounded, style.smallButton]}>
            <Ionicons name={'print'} size={20} color={colors.darkGreen} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('StartScreen')}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'log-in'} size={20} color={colors.darkGreen} />
          </Pressable>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={style.container}>
      <Pressable
        onPress={() => setOptionOpen(!optionOpen)}
        style={[style.buttonRounded, { marginBottom: 5 }]}
      >
        <Ionicons
          name={optionOpen ? 'close' : 'ellipsis-horizontal'}
          size={30}
          color={colors.darkGreen}
        />
      </Pressable>
      {renderOptions()}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    right: 20,
    alignItems: 'center',
  },
  smallButton: { width: 40, height: 40, marginTop: 5 },
  buttonRounded: {
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: colors.grey,
  },
});
