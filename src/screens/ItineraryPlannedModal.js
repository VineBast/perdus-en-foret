import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
import {
  addCurrentItinerary,
  addItinerary,
  userSelector,
} from '../redux/userSlice';

export function ItineraryPlannedModal({ navigation, geoPoints }) {
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

  const openItineraryScreen = () => {
    setModalVisible(false);
    dispatch(addCurrentItinerary(currentItinerary));
    dispatch(
      addItinerary({
        ...currentItinerary,
        id: uuid.v4(),
        date: new Date().toLocaleDateString('fr'),
        type: 'recent',
      })
    );
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
    setCurrentItinerary(
      userItineraries.find((itinerary) => itinerary.id === id)
    );
  };

  const deleteItineraryById = (id) => {
    setUserItineraries(
      userItineraries.filter((itinerary) => itinerary.id !== id)
    );
  };

  const ModalCloseContainer = () => (
    <View style={[style.modalColseContainer]}></View>
  );

  return (
    <>
      <Modal
        modalVisible={modalVisible}
        handleCloseModal={() => setModalVisible(false)}
      >
        <View style={[style.modalOpenBackground, position.columnCenter]}>
          <TopIndicator />
          <ScrollView
            style={[style.modalOpenContainer]}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
              <View style={[position.columnCenter, { paddingHorizontal: 27 }]}>
                <SubmitButton
                  label="Voir l'itinéraire"
                  onPress={openItineraryScreen}
                  style={{ marginVertical: 0 }}
                />
              </View>
              <View style={[position.rowCenter, { marginTop: 14 }]}>
                <View style={{ flex: 1 }}>
                  {currentItinerary &&
                    currentItinerary.points.map((point, i, points) => {
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
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[style.modalCloseBackground]}
      >
        <ModalCloseContainer />
      </Pressable>
    </>
  );
}

const style = StyleSheet.create({
  modalOpenContainer: {
    width: '100%',
  },
  modalColseContainer: {},
  modalOpenBackground: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingBottom: 50,
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
  },
  modalCloseBackground: {
    position: 'absolute',
    bottom: 0,
    height: '20%',
    backgroundColor: colors.darkGreen,
    borderTopLeftRadius: general.bigBorderRadius,
    borderTopRightRadius: general.bigBorderRadius,
    width: '100%',
  },
});
