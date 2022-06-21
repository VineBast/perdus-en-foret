import { useState } from 'react';
import {
  BackButton,
  Background,
  SubmitButton,
  Header,
  TextInput
} from '../../components';
import { View } from 'react-native';
import { resetPasswordEmail } from '../../services/firebase';

export function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={{width: '80%'}}>
        <Header>Reinitialiser mot de passe</Header>
        <TextInput
          label='Adresse email'
          returnKeyType='done'
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize='none'
          autoCompleteType='email'
          textContentType='emailAddress'
          keyboardType='email-address'
          description='You will receive email with password reset link.'
        />
        <SubmitButton
          label='Envoyer'
          onPress={() => resetPasswordEmail(navigation)}
        >
        </SubmitButton>
      </View>
    </Background>
  );
}
