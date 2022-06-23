import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  BackButton,
  Background,
  SubmitButton,
  TextInput,
  Title,
} from '../../components';
import { colors } from '../../core/theme';
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

      <ScrollView
        style={{ width: '100%', flex: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View
          style={{
            paddingTop: 80 + getStatusBarHeight(),
            paddingBottom: 40,
            paddingHorizontal: 20,
          }}
        >
          <Title>Inscription</Title>
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
            onPress={() =>
              createUser(
                {
                  lastName: lastName,
                  firstName: firstName,
                  tel: tel,
                  email: email,
                  password: password,
                },
                navigation
              )
            }
          />
          <View style={styles.row}>
            <Text style={{ color: colors.grey3 }}>
              Vous avez déjà un compte ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StartScreen')}
            >
              <Text style={{ color: colors.green, fontWeight: 'bold' }}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
