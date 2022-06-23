import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { Background, SubmitButton, TextInput, Title } from '../../components';
import { colors } from '../../core/theme';
import { addUserInRedux } from '../../redux/userSlice';
import { auth, getUser, userLogin } from '../../services/firebase';

export function StartScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(addUserInRedux(await getUser()));
        navigation.navigate('HomeScreen');
      }
    });
  }, []);

  return (
    <Background>
      <ScrollView
        style={{ width: '100%', flex: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View
          style={{
            paddingTop: 40 + getStatusBarHeight(),
            paddingBottom: 40,
            paddingHorizontal: 20,
          }}
        >
          <Title>Connexion</Title>
          <TextInput
            label='Email'
            returnKeyType='next'
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          <TextInput
            label='Mot de passe'
            returnKeyType='done'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <View style={style.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={{ color: colors.grey3 }}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
          <SubmitButton
            style={{ padding: 20 }}
            label='Se connecter'
            onPress={() => userLogin(email, password)}
          />
          <View style={style.textSignUp}>
            <Text style={{ color: colors.grey3 }}>
              Vous n'avez pas encore de compte ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={{ color: colors.green, fontWeight: 'bold' }}>
                S'inscrire
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{ color: '#000', fontWeight: 'bold', marginVertical: 20 }}
            >
              OU
            </Text>
          </View>
          <SubmitButton
            orange
            style={{ padding: 20 }}
            label='Continuer sans créer de compte'
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </ScrollView>
    </Background>
  );
}

const style = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginRight: 30,
  },
  textSignUp: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
