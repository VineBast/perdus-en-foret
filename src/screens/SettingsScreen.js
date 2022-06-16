import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { BackButton, Background } from '../components';
import { colors, theme } from '../core/theme';
import { getUser, logout } from '../services/firebase';

export function SettingsScreen() {
  const [user, setUser] = useState(undefined);
  const navigation = useNavigation();

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Background style={styles.container}>
      <BackButton white goBack={navigation.goBack} />
      <View>
        <Text style={styles.text}>Email: {user?.email}</Text>
        <Button
          style={styles.button}
          title='Logout'
          onPress={() => logout(navigation)}
          buttonStyle={{ backgroundColor: theme.colors.primary }}
        >
          Log out
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGreen,
  },

  button: {
    padding: 20,
  },
});
