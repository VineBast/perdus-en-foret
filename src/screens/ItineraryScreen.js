import * as MediaLibrary from 'expo-media-library';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import * as dataPRS from '../../assets/PRS/PRS_FR.json';
import { BackButton, Background, OptionButton } from '../components';

import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../.env.js';
import { colors } from '../core/theme';
import {
  createItineraryWithStep,
  filterDataPRS,
} from '../helpers/itineraryHelper';
import { userSelector } from '../redux/userSlice';

export function ItineraryScreen({ navigation }) {
  const user = useSelector(userSelector).user;
  const [itinerary, setItinerary] = useState(user.currentItinerary.points);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepInProgress, setIsStepInProgress] = useState(false);
  const [isFlash, setIsFlash] = useState(false);
  const [isNative, setIsNative] = useState(false);

  const googleMap = useRef(null);
  const itineraryWithStep = createItineraryWithStep(itinerary, true);
  const PRS = filterDataPRS(
    createItineraryWithStep(itinerary, false),
    dataPRS.features
  );

  useEffect(() => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
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
        setIsFlash(true);
        setTimeout(() => setIsFlash(false), 30);
        isNext && onNextArrowPress();
      });
    }
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
              pinColor={colors.red}
            />
          ))}
          {PRS?.map((coordinate, i) => (
            <MapView.Marker
              key={i}
              coordinate={{
                latitude: coordinate.geometry.coordinates[1],
                longitude: coordinate.geometry.coordinates[0],
              }}
              title={coordinate.properties.llib_prs}
              description={coordinate.properties.lobs_prs}
              pinColor={colors.orange}
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
              strokeWidth={3}
              strokeColor={colors.green}
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
                  onPress={() => takeScreenshot(true)}
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
                  onPress={takeScreenshot}
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
