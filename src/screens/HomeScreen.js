import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Background, OptionButton, Paragraph } from '.././components';
import { getUser } from '../services/firebase';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      setUser(await getUser());
    }
    fetchUser();
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
