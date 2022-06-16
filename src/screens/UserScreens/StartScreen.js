import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {
  Background,
  ClassicButton,
  Header,
  Paragraph,
  SubmitButton,
  TextInput,
  Title
} from '../../components';
import { colors } from '../../core/theme';
import { auth, userLogin } from '../../services/firebase';


export function StartScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('HomeScreen');
      }
    });
  }, []);

  return (
    <Background>
      <View style={{width: '80%'}}>
        <Title>Se connecter ou s’inscrire</Title>
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
            <Text style={{color: colors.grey3}}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        <SubmitButton 
          style={{ padding: 20 }} 
          label="Se connecter"  
          onPress={() => userLogin(email, password)} 
        />
        <View style={style.textSignUp}>
          <Text style={{color: colors.grey3}}>Vous n'avez pas encore de compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{color: colors.green, fontWeight:'bold'}}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent:'center' }}>
          <Text style={{color: '#000', fontWeight:'bold', marginVertical: 20}}>OU</Text>
        </View>
        <SubmitButton 
        orange 
        style={{ padding: 20 }} 
        label="Continuer sans créer de compte"  
        onPress={() => navigation.navigate('HomeScreen')} 
        />
      </View>
    </Background>
  );
}

const style = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginRight: 30
  },
  textSignUp: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
