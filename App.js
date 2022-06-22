import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Provider as ProviderPaper } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './src/core/theme';

import {
  HomeScreen,
  ItineraryScreen,
  ResetPasswordScreen,
  SettingsScreen,
  SignUpScreen,
  StartScreen,
} from './src/screens';
import store from './store';

export default function App() {
  const Stack = createStackNavigator();
  let persistor = persistStore(store);

  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSplashScreenVisible(false), 0);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProviderPaper store={store} theme={theme}>
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
              <Stack.Screen
                name='ItineraryScreen'
                component={ItineraryScreen}
              />
              <Stack.Screen name='StartScreen' component={StartScreen} />
              <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
              <Stack.Screen name='HomeScreen' component={HomeScreen} />
              <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
              <Stack.Screen
                name='ResetPasswordScreen'
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProviderPaper>
      </PersistGate>
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
