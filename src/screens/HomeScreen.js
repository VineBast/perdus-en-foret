import { useState, useEffect } from 'react';
import { Plateform, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';
import { Background, OptionButton } from '.././components';
import { userSelector } from '../redux/userSlice';
import * as data from '../../assets/PRS/PRS_FR.json';
import { colors } from '../core/theme';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';
import * as Location from 'expo-location';

export function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordinates, setCoordinates] = useState();
  const user = useSelector(userSelector).user;
  const dataPRS = useState(data.features); //dataPRS.geometry.coordinates[1] = latitude , dataPRS.geometry.coordinates[0] = longitude

  //Coordonnées par points du Nord-Ouest jusqu'au Sud-Ouest dans le sens des aiguilles d'une montre
  //dans le cas présent les points font un rectangle en forme de smartphone autour de l'Ile-de-France
/*   const [coordinates] = useState([
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
  ]); */


  const [filteredDataPRS, setFilteredDataPRS] = useState(data.features);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
      console.log(location);
      setFilteredDataPRS(filterDataPRS(location));
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(text);

  function filterDataPRS(location) {
    console.log(location);
    let latitudeNord = location.coords.latitude + 0.5;
    let latitudeSud = location.coords.latitude - 0.5;
    let longitudeOuest = location.coords.longitude - 0.5;
    let longitudeEst = location.coords.longitude + 0.5;
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
        {
        location && (
          <MapView
          focusable={true}
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.504757,
            longitudeDelta: 0.506866,
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
         )
        }

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
