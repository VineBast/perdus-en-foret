import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BackButton, Background, OptionButton, Paragraph } from '../components';
import { colors, general } from '../core/theme';
import { userSelector } from '../redux/userSlice';

export function ItineraryScreen({ navigation }) {
  const user = useSelector(userSelector).user;

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <OptionButton navigation={navigation} />
      <Paragraph>Voici l'itineraire</Paragraph>
      <View style={style.modalClose}>
        <Paragraph>Coucou</Paragraph>
      </View>
    </Background>
  );
}

const style = StyleSheet.create({
  modalClose: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
    width: '100%',
  },
});
