import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { BackButton, Background, OptionButton } from '../components';

import { colors } from '../core/theme';
import { userSelector } from '../redux/userSlice';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../.env.js';

export function ItineraryScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const [itinerary, setItinerary] = useState(user.currentItinerary.points);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepInProgress, setIsStepInProgress] = useState(false);
  const [isFlash, setIsFlash] = useState(false);
  const [isNative, setIsNative] = useState(false);

  const googleMap = useRef(null);
  const itineraryWithStep = createItineraryWithStep();

  useEffect(() => {
    if (Platform.OS === ('ios' || 'android')) {
      setIsNative(true);
      if (isStepInProgress) {
        zoomOnMap([
          itineraryWithStep[currentStep],
          itineraryWithStep[currentStep + 1],
        ]);
      } else {
        zoomOnMap(itinerary);
      }
    }
  }, [isStepInProgress, currentStep]);

  function createSteps(index) {
    return {
      latitude: (itinerary[index].latitude + itinerary[index + 1].latitude) / 2,
      longitude:
        (itinerary[index].longitude + itinerary[index + 1].longitude) / 2,
    };
  }

  function createItineraryWithStep() {
    const list = [];
    itinerary.forEach((_, i) => {
      list.push({
        latitude: itinerary[i].latitude,
        longitude: itinerary[i].longitude,
      });
      if (i < itinerary.length - 1) list.push(createSteps(i));
    });
    return list;
  }

  function zoomOnMap(itineraryFit) {
    googleMap.current.fitToCoordinates(itineraryFit, {
      edgePadding: {
        bottom: 200,
        right: 50,
        top: 150,
        left: 50,
      },
      animated: true,
    });
  }

  function onNextArrowPress() {
    if (currentStep === itineraryWithStep.length - 2) {
      setCurrentStep(0);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  function onPrevArrowPress() {
    if (currentStep === 0) {
      setCurrentStep(itineraryWithStep.length - 2);
    } else {
      setCurrentStep(currentStep - 1);
    }
  }

  async function takeSnapshot() {
    const status = await MediaLibrary.getPermissionsAsync();
    if (status.granted) {
      const snapshot = googleMap.current.takeSnapshot({
        format: 'png', // image formats: 'png', 'jpg' (default: 'png')
        quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
        result: 'file', // result types: 'file', 'base64' (default: 'file')
      });
      snapshot.then((uri) => {
        MediaLibrary.createAssetAsync(uri);
      });
    }
  }

  async function takeOneSnapshot() {
    await takeSnapshot();
    setIsFlash(true);
    setTimeout(() => setIsFlash(false), 30);
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <OptionButton
        favorite
        print={isNative ? false : true}
        isOpen
        navigation={navigation}
      />
      <View style={[style.flash, { display: isFlash ? 'flex' : 'none' }]} />
      <View style={style.container}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          focusable={true}
          ref={googleMap}
          showsUserLocation={true}
          followUserLocation={true}
          style={style.map}
          onTouchStart={() => setIsStepInProgress(false)}
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
      {isNative && (
        <View
          style={[
            style.arrowsContent,
            { width: isStepInProgress ? '50%' : '30%' },
          ]}
        >
          {isStepInProgress ? (
            <>
              <Pressable onPress={onPrevArrowPress}>
                <Ionicons name={'arrow-back'} size={30} color={colors.white} />
              </Pressable>
              <Pressable>
                <Ionicons
                  onPress={takeOneSnapshot}
                  name={'camera'}
                  size={30}
                  color={colors.white}
                />
              </Pressable>
              <Pressable onPress={onNextArrowPress}>
                <Ionicons
                  name={'arrow-forward'}
                  size={30}
                  color={colors.white}
                />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable onPress={() => setIsStepInProgress(true)}>
                <Ionicons name={'walk'} size={30} color={colors.white} />
              </Pressable>
              <Pressable>
                <Ionicons
                  onPress={takeOneSnapshot}
                  name={'camera'}
                  size={30}
                  color={colors.white}
                />
              </Pressable>
            </>
          )}
        </View>
      )}
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
  arrowsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    zIndex: 99999,
    backgroundColor: colors.darkGreen,
    padding: 15,
    borderRadius: 25,
  },
  flash: {
    position: 'absolute',
    zIndex: 999999,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});
