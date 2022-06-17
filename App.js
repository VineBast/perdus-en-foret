import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { theme } from './src/core/theme';
import {
  HomeScreen,
  ItineraryScreen,
  ResetPasswordScreen,
  SettingsScreen,
  SignUpScreen,
  StartScreen,
  UpdateScreen
} from './src/screens';

const Stack = createStackNavigator();

export default function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSplashScreenVisible(false), 0);
  }, []);
  return (
    <Provider theme={theme}>
      {isSplashScreenVisible ? (
        <View style={style.splashScreenContainer}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: 'https://docs.ypariset.fr/img/logo-pef.png' }}
          ></Image>
        </View>
      ) : (
        <></>
      )}

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='StartScreen'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='ItineraryScreen' component={ItineraryScreen} />
          <Stack.Screen name='StartScreen' component={StartScreen} />
          <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
          <Stack.Screen name='UpdateScreen' component={UpdateScreen} />
          <Stack.Screen
            name='ResetPasswordScreen'
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const style = StyleSheet.create({
  splashScreenContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
