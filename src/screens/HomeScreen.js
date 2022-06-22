import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as data from '../../assets/PRS/PRS_FR.json';
import { Background, OptionButton } from '.././components';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';
import { BackButton, Background, OptionButton } from '.././components';
import { userSelector } from '../redux/userSlice';

import * as data from '../../assets/PRS/PRS_FR.json';
import { colors } from '../core/theme';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({
    coords: { latitude: 48.860708, longitude: 2.337322 },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const googleMap = useRef(null);
  const dataPRS = data.features; //dataPRS.geometry.coordinates[1] = latitude , dataPRS.geometry.coordinates[0] = longitude
  const [filteredDataPRS, setFilteredDataPRS] = useState(
    filterDataPRS(location)
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setFilteredDataPRS(filterDataPRS(location));
      changeRegion(location);
      setLocation(location);
    })();
  }, []);

  const changeRegion = (location) => {
    googleMap.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.504757,
      longitudeDelta: 0.506866,
    });
  };

  function filterDataPRS(location) {
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
      {!user.uid && <BackButton goBack={navigation.goBack} />}
      <OptionButton navigation={navigation} />
      <View style={style.container}>
        {
          <MapView
            focusable={true}
            showsUserLocation={true}
            followUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            ref={googleMap}
            style={style.map}
            onRegionChangeComplete={(status) =>
              setFilteredDataPRS(
                filterDataPRS({
                  coords: {
                    latitude: status.latitude,
                    longitude: status.longitude,
                  },
                })
              )
            }
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
                description={marker.properties.lobs_prs}
                pinColor={colors.orange}
              >
                <Callout>
                  <View>
                    <Text>{marker.properties.llib_prs}</Text>
                    <Text>{marker.properties.lobs_prs}</Text>
                    <Text>Latitude : {marker.geometry.coordinates[1]}</Text>
                    <Text>Longitude : {marker.geometry.coordinates[0]}</Text>
                  </View>
                </Callout>
              </MapView.Marker>
            ))}
          </MapView>
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
  containerCallout: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});
