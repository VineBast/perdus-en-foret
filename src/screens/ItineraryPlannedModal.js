import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getSortByDate } from '../helpers/sort';
import isItineraryExist from '../helpers/isItineraryExist';
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
import {
  addCurrentItinerary,
  addItinerary,
  removeItinerary,
  updateDateItinerary,
  userSelector,
} from '../redux/userSlice';

export function ItineraryPlannedModal({ navigation }) {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector(userSelector).user;

  const [modalVisible, setModalVisible] = useState();
  const [currentItinerary, setCurrentItinerary] = useState();
  const [userItineraries, setUserItineraries] = useState();
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);

  useEffect(() => {
    setCurrentItinerary(user.currentItinerary);
    setUserItineraries(user.itineraries);
  }, [modalVisible]);

  useEffect(() => {
    console.log(currentItinerary);
  }, [currentItinerary]);

  const openItineraryScreen = () => {
    setModalVisible(false);
    dispatch(addCurrentItinerary(currentItinerary));
    const itineraryInList = isItineraryExist(currentItinerary, user.itineraries);
    if (itineraryInList === undefined) {
      dispatch(
        addItinerary({
          ...currentItinerary,
          id: uuid.v4(),
          date: new Date().toString(),
          type: 'recent',
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
  };

  const deletePoint = (id) => {
    const filteredPoints = currentItinerary.points.filter(
      (point) => point.id !== id
    );

    setCurrentItinerary({
      ...currentItinerary,
      points: filteredPoints,
    });
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
          latitude: Number(latitude),
          longitude: Number(longitude),
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
      points: userItineraries.find(itinerary => itinerary.id === id).points
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
    const lastItinerary = getSortByDate(user.itineraries, false)[0];
    setCurrentItinerary(lastItinerary);
    openItineraryScreen();
  };

  const actions = [
    {
      label: 'Rechercher',
      onPress: () => setModalVisible(true),
      icon: (
        <Svg width={16} height={16}>
          <Path fill="#fff" d="M6.005 2.002a4.003 4.003 0 1 0 0 8.006 4.003 4.003 0 0 0 0-8.006zM0 6.005a6.005 6.005 0 1 1 10.898 3.479l4.821 4.82a1 1 0 0 1-1.415 1.415l-4.82-4.82A6.005 6.005 0 0 1 0 6.006z" />
        </Svg>
      ),
      iconColor: colors.orange
    },
    {
      label: 'Charger le dernier itinéraire',
      onPress: setLastItinerary,
      icon: (
        <Svg width={16} height={16}>
          <Path fill="#fff" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm2.07 11.2L7.434 8.565A.815.815 0 0 1 7.199 8V4a.802.802 0 0 1 1.602 0v3.668l2.398 2.402a.797.797 0 0 1 0 1.13.797.797 0 0 1-1.129 0zm0 0" />
        </Svg>
      ),
      iconColor: colors.grey3
    },
  ];

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
          >
            <View onStartShouldSetResponder={() => true}>
              <View style={[position.columnCenter, { paddingHorizontal: 27 }]}>
                <SubmitButton
                  label="Voir l'itinéraire"
                  onPress={openItineraryScreen}
                  style={{ marginVertical: 0 }}
                />
              </View>
              <View style={[position.rowCenter, { marginTop: 14 }]}>
                <View style={{ flex: 1 }}>
                  {currentItinerary?.points.map((point, i, points) => {
                      const isLast = i === points.length - 1;
                      return (
                        <LatLngInput
                          key={point.id}
                          point={point}
                          isLast={isLast}
                          showDelete={points.length > 2}
                          handleDelete={(id) => deletePoint(id)}
                          onChange={({ latitude, longitude }) =>
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
          </ScrollView>
        </View>
      </Modal>
      <View style={style.premodalContainer}>
        <View style={style.actionsWrapper}>
          {actions.map((action, i, arr) => (
            <Pressable key={i} onPress={action.onPress} style={[position.rowSpace, style.action, { borderBottomWidth: i !== arr.length - 1 ? 1 : 0,  }]}>
              <View style={{ padding: 8, borderRadius: 100, backgroundColor: action.iconColor }}>
                {action.icon}
              </View>
              <Text style={{ flex: 1, marginLeft: 10, fontSize: 16 }}>{action.label}</Text>
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
    overflow: 'hidden'
  },
  action: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  openedModalContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingBottom: 50,
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
});
