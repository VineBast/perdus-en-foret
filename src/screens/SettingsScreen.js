import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  BackButton,
  Background,
  ProfileButton,
  SettingButton,
  SubmitButton,
} from '../components';
import { colors, theme } from '../core/theme';
import { userSelector } from '../redux/userSlice';
import { logout } from '../services/firebase';

export function SettingsScreen({ navigation }) {
  const user = useSelector(userSelector).user;

  return (
    <Background style={styles.container}>
      <BackButton white goBack={navigation.goBack} />
      <View style={{ height: '100%', width: '100%', marginTop: 200 }}>
        <View style={{ marginBottom: 300 }}>
          <ProfileButton
            name={user?.firstName}
            mail={user?.email}
            tel={user?.tel}
            navigation={navigation}
          ></ProfileButton>
          <SettingButton label='Itininéraires favoris'></SettingButton>
          <SettingButton label='Option 1'></SettingButton>
          <SettingButton label='Option 1'></SettingButton>
          <SettingButton label='Option 1'></SettingButton>
        </View>
        <SubmitButton
          orange
          style={styles.button}
          label='Déconnexion'
          onPress={() => logout(navigation)}
          buttonStyle={{ backgroundColor: theme.colors.primary }}
        >
          Log out
        </SubmitButton>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreen,
  },

  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
