import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddPointButton,
  FilterModalSwitch,
  LatLngInput,
  ListWithOptions,
  Modal,
  SubmitButton,
  SwitchArrowIcon,
  TopIndicator,
} from '../components';
import { colors, general, position } from '../core/theme';
import isItineraryExist from '../helpers/isItineraryExist';
import { getSortByDate } from '../helpers/sort';
import {
  addCurrentItinerary,
  addItinerary,
  removeItinerary,
  updateDateItinerary,
  userSelector,
} from '../redux/userSlice';

export function ItineraryPlannedModal({
  navigation,
  onMarkerPress,
  modalVisible,
  setModalVisible,
}) {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector(userSelector).user;

  const [currentItinerary, setCurrentItinerary] = useState();
  const [userItineraries, setUserItineraries] = useState();
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);

  useEffect(() => {
    setCurrentItinerary(user.currentItinerary);
    setUserItineraries(user.itineraries);
  }, [modalVisible]);

  const computeIsValidInput = (points) => {
    const isValidInput = (input) =>
      input &&
      input !== '' &&
      typeof Number(input) === 'number' &&
      !isNaN(Number(input));
    const isValidLatidude = (lat) => lat >= -90 && lat <= 90;
    const isValidLongitude = (lng) => lng >= -180 && lng <= 180;

    return points.every(
      (point) =>
        isValidInput(point.latitude) &&
        isValidLatidude(point.latitude) &&
        isValidInput(point.longitude) &&
        isValidLongitude(point.longitude)
    );
  };

  useEffect(() => {
    if (currentItinerary) {
      setIsValidSubmit(computeIsValidInput(currentItinerary.points));
    }
  }, [currentItinerary?.points]);

  const openItineraryScreen = () => {
    setModalVisible(false);
    dispatch(
      addCurrentItinerary({
        ...currentItinerary,
        points: currentItinerary.points.map((point) => ({
          ...point,
          latitude: Number(point.latitude),
          longitude: Number(point.longitude),
        })),
      })
    );

    const itineraryInList = isItineraryExist(
      currentItinerary,
      user.itineraries
    );
    if (itineraryInList === undefined) {
      dispatch(
        addItinerary({
          ...currentItinerary,
          id: uuid.v4(),
          date: new Date().toString(),
          type: 'recent',
          points: currentItinerary.points.map((point) => ({
            ...point,
            latitude: Number(point.latitude),
            longitude: Number(point.longitude),
          })),
        })
      );
    } else {
      dispatch(updateDateItinerary(itineraryInList));
    }
    navigation.navigate('ItineraryScreen');
  };

  const addPoint = () => {
    setCurrentItinerary({
      ...currentItinerary,
      points: [
        ...currentItinerary.points,
        { id: uuid.v4(), latitude: '', longitude: '' },
      ],
    });
    dispatch(
      addCurrentItinerary({
        ...currentItinerary,
        points: [
          ...currentItinerary.points,
          { id: uuid.v4(), latitude: '', longitude: '' },
        ],
      })
    );
  };

  const deletePoint = (id) => {
    const filteredPoints = currentItinerary.points.filter(
      (point) => point.id !== id
    );

    setCurrentItinerary({
      ...currentItinerary,
      points: filteredPoints,
    });

    dispatch(
      addCurrentItinerary({
        ...currentItinerary,
        points: filteredPoints,
      })
    );
  };

  const reverseGeoPoints = () => {
    const reversedPoints = [...currentItinerary.points].reverse();

    setCurrentItinerary({
      ...currentItinerary,
      points: reversedPoints,
    });
  };

  const onChangeInput = ({ id, latitude, longitude }) => {
    const modifiedPoints = currentItinerary.points.map((point) =>
      point.id === id
        ? {
            ...point,
            latitude: latitude,
            longitude: longitude,
          }
        : point
    );

    setCurrentItinerary({
      ...currentItinerary,
      points: modifiedPoints,
    });
  };

  const setSpecificItinerary = (id) => {
    setCurrentItinerary({
      ...currentItinerary,
      points: userItineraries.find((itinerary) => itinerary.id === id).points,
    });
  };

  const deleteItineraryById = (id) => {
    const itinerariesUpdated = userItineraries.filter(
      (itinerary) => itinerary.id !== id
    );
    setUserItineraries(itinerariesUpdated);
    dispatch(removeItinerary(itinerariesUpdated));
  };

  const setLastItinerary = () => {
    if (user.itineraries.length === 0) {
      setModalVisible(true);
    } else {
      const lastItinerary = getSortByDate(user.itineraries, false)[0];
      setCurrentItinerary(lastItinerary);
      openItineraryScreen();
    }
  };

  const actions = [
    {
      label: 'Rechercher',
      onPress: () => setModalVisible(true),
      icon: (
        <Svg width={16} height={16}>
          <Path
            fill='#fff'
            d='M6.005 2.002a4.003 4.003 0 1 0 0 8.006 4.003 4.003 0 0 0 0-8.006zM0 6.005a6.005 6.005 0 1 1 10.898 3.479l4.821 4.82a1 1 0 0 1-1.415 1.415l-4.82-4.82A6.005 6.005 0 0 1 0 6.006z'
          />
        </Svg>
      ),
      iconColor: colors.orange,
    },
    {
      label: 'Charger le dernier itinéraire',
      onPress: setLastItinerary,
      icon: (
        <Svg width={16} height={16}>
          <Path
            fill='#fff'
            d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm2.07 11.2L7.434 8.565A.815.815 0 0 1 7.199 8V4a.802.802 0 0 1 1.602 0v3.668l2.398 2.402a.797.797 0 0 1 0 1.13.797.797 0 0 1-1.129 0zm0 0'
          />
        </Svg>
      ),
      iconColor: colors.grey3,
    },
  ];

  function onMarkerModalPress(index) {
    onMarkerPress(index);
  }

  return (
    <>
      <Modal
        modalVisible={modalVisible}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View style={[style.openedModalContainer, position.columnCenter]}>
          <TopIndicator />
          <ScrollView
            style={{ width: '100%' }}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
          >
            <View style={{ paddingHorizontal: 27 }}>
              <SubmitButton
                label="Voir l'itinéraire"
                disabled={!isValidSubmit}
                onPress={openItineraryScreen}
                style={{ marginVertical: 0 }}
              />
            </View>
            <View onStartShouldSetResponder={() => true}>
              <View style={[position.rowCenter, { marginTop: 14 }]}>
                <View style={{ flex: 1 }}>
                  {currentItinerary &&
                    [...currentItinerary.points].map((point, i, points) => {
                      const isLast = i === points.length - 1;
                      return (
                        <LatLngInput
                          onMarkerModalPress={onMarkerModalPress}
                          inputIndex={i}
                          key={point.id}
                          point={point}
                          isLast={isLast}
                          showDelete={points.length > 2}
                          handleDelete={(id) => deletePoint(id)}
                          onChange={({
                            latitude = point.latitude,
                            longitude = point.longitude,
                          }) =>
                            onChangeInput({
                              id: point.id,
                              latitude: latitude,
                              longitude: longitude,
                            })
                          }
                          style={{ marginBottom: isLast ? 0 : 10 }}
                        />
                      );
                    })}
                </View>
                <SwitchArrowIcon color='#fff' onPress={reverseGeoPoints} />
              </View>
              <View
                style={[
                  position.rowSpace,
                  { marginTop: 14, alignItems: 'stretch' },
                ]}
              >
                <FilterModalSwitch
                  onPress={() => setIsFavoriteSelected(!isFavoriteSelected)}
                  isFavoriteSelected={isFavoriteSelected}
                  style={{ marginRight: 5 }}
                />
                <AddPointButton onPress={addPoint} style={{ marginLeft: 5 }} />
              </View>
              {userItineraries && (
                <ListWithOptions
                  itineraries={userItineraries}
                  isFavoriteSelected={isFavoriteSelected}
                  style={{ marginTop: 14 }}
                  handlePress={(id) => setSpecificItinerary(id)}
                  handleDelete={(id) => deleteItineraryById(id)}
                />
              )}
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </Modal>
      <View style={style.premodalContainer}>
        <View style={style.actionsWrapper}>
          {actions.map((action, i, arr) => (
            <Pressable
              key={i}
              onPress={action.onPress}
              style={[
                position.rowSpace,
                style.action,
                { borderBottomWidth: i !== arr.length - 1 ? 1 : 0 },
              ]}
            >
              <View
                style={{
                  padding: 8,
                  borderRadius: 100,
                  backgroundColor: action.iconColor,
                }}
              >
                {action.icon}
              </View>
              <Text style={{ flex: 1, marginLeft: 10, fontSize: 16 }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  premodalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 50,
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
  actionsWrapper: {
    marginTop: -20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  action: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  openedModalContainer: {
    width: '100%',
    maxHeight: '90%',
    paddingHorizontal: 16,
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
});
