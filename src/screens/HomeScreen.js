import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Background,
  OptionButton,
  Paragraph,
} from '.././components';
import { getUser, getUserFirestore } from '../services/firebase';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const [user, setUser] = useState(undefined);
  console.log(user)

  useEffect(() => {
    async function user() {
      setUser(await getUser())
    }
    user();
  }, []);

  return (
    <Background>
      <OptionButton navigation={navigation} />
      {user ? (
        <>
          <Paragraph>{`Bonjour ${user?.lastName} vous êtes bien connecté.`}</Paragraph>
          <Paragraph>{user?.email}</Paragraph>
        </>
      ) : (
        <></>
      )}
      <ItineraryPlannedModal navigation={navigation} />
    </Background>
  );
}

const style = StyleSheet.create({});
