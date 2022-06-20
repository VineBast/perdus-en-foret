import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';
import { BackButton, Background, OptionButton } from '../components';
import { colors } from '../core/theme';
import { userSelector } from '../redux/userSlice';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../.env.js';

export function ItineraryScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const [itinerary, setItinerary] = useState(user.currentItinerary.points);
  const googleMap = useRef(null);

  useEffect(() => {
    function test() {
      return googleMap.current.fitToCoordinates(itinerary, {
        edgePadding: {
          bottom: 200,
          right: 50,
          top: 150,
          left: 50,
        },
        animated: true,
      });
    }
    Platform.OS === 'ios' && test();
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <OptionButton favorite print isOpen navigation={navigation} />
      <View style={style.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          focusable={true}
          ref={googleMap}
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          initialRegion={{
            latitude: itinerary[0].latitude,
            longitude: itinerary[0].longitude,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          {itinerary.map((coordinate, i) => (
            <MapView.Marker
              key={i}
              coordinate={coordinate}
              title={'title'}
              description={'description'}
              pinColor={colors.orange}
            />
          ))}
          <MapViewDirections
            region='FR'
            origin={itinerary[0]}
            destination={itinerary[itinerary.length - 1]}
            waypoints={
              itinerary.length > 2 ? itinerary.slice(1, -1) : undefined
            }
            apikey={GOOGLE_MAPS_APIKEY}
            precision='high'
            mode='WALKING'
          />
        </MapView>
      </View>
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
