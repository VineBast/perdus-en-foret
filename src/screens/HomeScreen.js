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
  const [regionChanged, setRegionChanged] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useSelector(userSelector).user;
  const dataPRS = data.features; //dataPRS.geometry.coordinates[1] = latitude , dataPRS.geometry.coordinates[0] = longitude
  const [filteredDataPRS, setFilteredDataPRS] = useState(data.features);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
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
    let latitudeNord = location.coords.latitude + 0.2;
    let latitudeSud = location.coords.latitude - 0.2;
    let longitudeOuest = location.coords.longitude - 0.2;
    let longitudeEst = location.coords.longitude + 0.2;
    return dataPRS.filter(
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
              showsMyLocationButton	={false}
              showsCompass={false}
              style={style.map}
              onRegionChangeComplete={(status) => setFilteredDataPRS(filterDataPRS({ 'coords' : { latitude: status.latitude, longitude: status.longitude } }))}
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
                  title={marker.properties.llib_prs}
                  description={marker.properties.libs_prs}
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
