import { useSelector } from 'react-redux';
import { Background, OptionButton, Paragraph } from '.././components';
import { userSelector } from '../redux/userSlice';
import { Background, OptionButton } from '.././components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../.env.js';
import { Background, OptionButton } from '.././components';
import { colors } from '../core/theme';
import { getUser } from '../services/firebase';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const user = useSelector(userSelector).user;

  const [coordinates] = useState([
    {
      latitude: 48.8275168,
      longitude: 2.3479068 + 0.007,
    },
    {
      latitude: 48.838665,
      longitude: 2.350624 + 0.007,
    },
    {
      latitude: 48.8462956,
      longitude: 2.347077 + 0.007,
    },
    {
      latitude: 48.8461544,
      longitude: 2.3484181 + 0.007,
    },
  ]);

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
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.032,
            longitudeDelta: 0.032,
          }}
        >
          {coordinates.map((coordinate, i) => (
            <MapView.Marker
              key={i}
              coordinate={coordinate}
              title={'title'}
              description={'description'}
              pinColor={colors.orange}
            />
          ))}
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[3]}
            apikey={GOOGLE_MAPS_APIKEY}
            waypoints={[coordinates[1], coordinates[2]]}
          />
        </MapView>
      </View>
      <ItineraryPlannedModal navigation={navigation} />
    </Background>
  );
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
