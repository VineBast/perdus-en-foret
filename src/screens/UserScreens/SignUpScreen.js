import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import {
  BackButton,
  Background,
  TextInput,
  Title,
  SubmitButton
} from '../../components';
import { theme, colors } from '../../core/theme';
import { createUser } from '../../services/firebase';

export function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [tel, setTel] = useState('');

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={{width: '80%'}}>
        <Title>S’inscrire</Title>
        <TextInput
          label='Nom'
          returnKeyType='next'
          value={lastName}
          onChangeText={(text) => setlastName(text)}
        />
        <TextInput
          label='Prénom'
          returnKeyType='next'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
         <TextInput
          label='N° Telephone'
          returnKeyType='next'
          value={tel}
          onChangeText={(text) => setTel(text)}
          keyboardType='phone-pad'
        />
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
          <SubmitButton 
        style={{ padding: 20 }} 
        label="S'inscrire"  
        onPress={() => createUser(
          {
            lastName: lastName,
            firstName: firstName,
            tel: tel,
            email: email,
            password: password,
          },
          navigation
        )} 
        />
        <View style={styles.row}>
          <Text style={{color: colors.grey3}}>Vous avez déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('StartScreen')}>
            <Text style={{color: colors.green, fontWeight:'bold'}}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
