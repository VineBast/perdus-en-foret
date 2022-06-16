import { useState } from 'react';

import {
  BackButton,
  Background,
  ClassicButton,
  Header,
  Logo,
} from '../../components';
import { resetPasswordEmail } from '../../services/firebase';

export function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label='E-mail address'
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
      <ClassicButton
        mode='contained'
        onPress={() => resetPasswordEmail(navigation)}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </ClassicButton>
    </Background>
  );
}
