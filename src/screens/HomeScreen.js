import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';
import { Background, OptionButton } from '.././components';
import { userSelector } from '../redux/userSlice';
import { ItineraryPlannedModal } from './ItineraryPlannedModal';

export function HomeScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);

  return (
    <Background>
      <OptionButton navigation={navigation} />
      <View style={style.container}>
        <MapView
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          initialRegion={{
            latitude: location ? location.coords.latitude : 48.829860607528325,
            longitude: location ? location.coords.longitude : 2.357358372109327,
            latitudeDelta: 0.032,
            longitudeDelta: 0.032,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
