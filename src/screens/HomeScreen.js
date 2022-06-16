import { useSelector } from 'react-redux';
import { Background, OptionButton, Paragraph } from '.././components';
import { userSelector } from '../redux/userSlice';
import { Background, OptionButton } from '.././components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
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
      <View style={style.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={style.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>
      <ItineraryPlannedModal navigation={navigation} />
    </Background>
  );
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
