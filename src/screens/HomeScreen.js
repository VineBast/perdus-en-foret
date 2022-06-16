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
  const [userFirestore, SetUserFirestore] = useState(undefined);

  useEffect(() => {
    setUser(getUser())
    SetUserFirestore(getUserFirestore());
  }, []);

  return (
    <Background>
      <OptionButton navigation={navigation} />
      {user ? (
        <>
          <Paragraph>{`Bonjour ${userFirestore?.lastName} vous êtes bien connecté.`}</Paragraph>
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
