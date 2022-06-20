import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';
import { Background, OptionButton } from '.././components';
import { userSelector } from '../redux/userSlice';

import * as data from '../../assets/PRS/PRS_FR.json';
import { colors } from '../core/theme';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const dataPRS = useState(data.features); //dataPRS.geometry.coordinates[1] = latitude , dataPRS.geometry.coordinates[0] = longitude

  //Coordonnées par points du Nord-Ouest jusqu'au Sud-Ouest dans le sens des aiguilles d'une montre
  //dans le cas présent les points font un rectangle en forme de smartphone autour de l'Ile-de-France
  const [coordinates] = useState([
    //Point 0 : Nord-Ouest
    {
      latitude: 49.334252,
      longitude: 1.942471,
    },
    //Point 1 : Nord-Est
    {
      latitude: 49.334252,
      longitude: 2.63375,
    },
    //Point 2 : Sud-Est
    {
      latitude: 48.639048,
      longitude: 2.63375,
    },
    //Point 3 : Sud-Ouest
    {
      latitude: 48.639048,
      longitude: 1.942471,
    },
  ]);
  const [filteredDataPRS, setFilteredDataPRS] = useState(() =>
    filterDataPRS(
      coordinates[0].latitude,
      coordinates[2].latitude,
      coordinates[0].longitude,
      coordinates[1].longitude
    )
  );
  const [filteredDataPRS, setFilteredDataPRS] = useState(
    filterDataPRS(
      coordinates[0].latitude,
      coordinates[2].latitude,
      coordinates[0].longitude,
      coordinates[1].longitude
    )
  );

  function filterDataPRS(
    latitudeNord,
    latitudeSud,
    longitudeOuest,
    longitudeEst
  ) {
    return dataPRS[0].filter(
      (elm) =>
        elm.geometry.coordinates[0] < longitudeEst &&
        elm.geometry.coordinates[0] > longitudeOuest &&
        elm.geometry.coordinates[1] < latitudeNord &&
        elm.geometry.coordinates[1] > latitudeSud
    );
  }

  return (
    <Background>
      <OptionButton navigation={navigation} />
      <View style={style.container}>
        <MapView
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          initialRegion={{
            latitude: 48.892872,
            longitude: 2.247802,
            latitudeDelta: 0.65,
            longitudeDelta: 0.65,
          }}
        >
          {filteredDataPRS.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={{
                latitude: marker.geometry.coordinates[1],
                longitude: marker.geometry.coordinates[0],
              }}
              title={'title'}
              description={'description'}
              pinColor={colors.orange}
            />
          ))}
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
