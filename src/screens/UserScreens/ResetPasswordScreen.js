import { useState } from 'react';
import {
  BackButton,
  Background,
  SubmitButton,
  Header,
  TextInput
} from '../../components';
import { ScrollView, View } from 'react-native';
import { resetPasswordEmail } from '../../services/firebase';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ScrollView
        style={{ width: '100%', flex: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ paddingTop: 80 + getStatusBarHeight(), paddingBottom: 40, paddingHorizontal: 20 }}>
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
      </ScrollView>
    </Background>
  );
}
