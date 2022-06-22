import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as dataPRS from '../../assets/PRS/PRS_FR.json';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { BackButton, Background, OptionButton } from '../components';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../.env.js';
import { colors } from '../core/theme';
import { userSelector } from '../redux/userSlice';

export function ItineraryScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const [itinerary, setItinerary] = useState(user.currentItinerary.points);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepInProgress, setIsStepInProgress] = useState(false);
  const [isFlash, setIsFlash] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [PRS, setPRS] = useState(filterDataPRS());

  const googleMap = useRef(null);
  const itineraryWithStep = createItineraryWithStep();

  function filterDataPRS() {
    let latitudeNord = createSteps(0).latitude + 1;
    let latitudeSud = createSteps(0).latitude - 1;
    let longitudeOuest = createSteps(0).longitude - 1;
    let longitudeEst = createSteps(0).longitude + 1;
    return dataPRS.features.filter(
      (elm) =>
        elm.geometry.coordinates[0] < longitudeEst &&
        elm.geometry.coordinates[0] > longitudeOuest &&
        elm.geometry.coordinates[1] < latitudeNord &&
        elm.geometry.coordinates[1] > latitudeSud
    );
  }

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
    console.log('ItineraryScreen', itinerary);
    console.log('PRS', PRS);
  }, [isStepInProgress, currentStep, PRS]);

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

  async function takeScreenshot(isNext) {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    } else {
      const snapshot = googleMap.current.takeSnapshot({
        format: 'png', // image formats: 'png', 'jpg' (default: 'png')
        quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
        result: 'file', // result types: 'file', 'base64' (default: 'file')
      });
      snapshot.then((uri) => {
        MediaLibrary.createAssetAsync(uri);
        isNext && onNextArrowPress();
      });
    }
  }

  async function takeOneSnapshot(isNext) {
    await takeScreenshot(isNext);
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
          {PRS.map((coordinate, i) => (
            <MapView.Marker
              key={i}
              coordinate={{
                latitude: coordinate.geometry.coordinates[1],
                longitude: coordinate.geometry.coordinates[0],
              }}
              title={coordinate.properties.llib_prs}
              description={coordinate.properties.lobs_prs}
              pinColor={colors.darkGreen}
            />
          ))}
          {isNative ? (
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
          ) : (
            <MapView.Polyline coordinates={itinerary} />
          )}
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
                  onPress={() => takeOneSnapshot(true)}
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
