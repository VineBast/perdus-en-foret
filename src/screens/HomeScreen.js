import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Background, OptionButton, Paragraph } from '.././components';
import { userSelector } from '../redux/userSlice';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const user = useSelector(userSelector).user;

  return (
    <Background>
      <OptionButton navigation={navigation} />
      {user && (
        <>
          <Paragraph>{`Bonjour ${user?.lastName} vous êtes bien connecté.`}</Paragraph>
          <Paragraph>{user?.lastName}</Paragraph>
        </>
      )}
      <ItineraryPlannedModal navigation={navigation} />
    </Background>
  );
}

const style = StyleSheet.create({});
