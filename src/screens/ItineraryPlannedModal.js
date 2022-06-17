import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import uuid from 'react-native-uuid';
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

export function ItineraryPlannedModal({ navigation, geoPoints }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [userItineraries, setUserItineraries] = useState([]);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);

  useEffect(() => {
    setCurrentItinerary({
      id: uuid.v4(),
      name: '',
      points: [
        { id: uuid.v4(), lat: '', lng: '' },
        { id: uuid.v4(), lat: '', lng: '' },
      ],
    });
    setUserItineraries([
      {
        id: uuid.v4(),
        type: 'recent',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: 'Petit rocher',
      },
      {
        id: uuid.v4(),
        type: 'recent',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: '',
      },
      {
        id: uuid.v4(),
        type: 'recent',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: 'Gros rocher',
      },
      {
        id: uuid.v4(),
        type: 'favorite',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: 'Gros rocher',
      },
      {
        id: uuid.v4(),
        type: 'favorite',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: 'Petit rocher',
      },
      {
        id: uuid.v4(),
        type: 'favorite',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: 'Mairie des Lilas',
      },
      {
        id: uuid.v4(),
        type: 'favorite',
        points: [
          { id: uuid.v4(), lat: '48.50679', lng: '2.05231' },
          { id: uuid.v4(), lat: '47.50679', lng: '3.05231' },
          { id: uuid.v4(), lat: '46.50679', lng: '4.05231' },
          { id: uuid.v4(), lat: '45.50679', lng: '5.05231' },
        ],
        date: '12/06/2022',
        name: '',
      },
    ]);
  }, []);

  const openItineraryScreen = () => {
    setModalVisible(false);
    navigation.navigate('ItineraryScreen');
  };

  const addPoint = () => {
    setCurrentItinerary({
      ...currentItinerary,
      points: [...currentItinerary.points, { id: uuid.v4(), lat: '', lng: '' }],
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

  const onChangeInput = ({ id, lat, lng }) => {
    const modifiedPoints = currentItinerary.points.map((point) =>
      point.id === id ? { ...point, lat: lat, lng: lng } : point
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
                          onChange={({ lat, lng }) =>
                            onChangeInput({ id: point.id, lat: lat, lng: lng })
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
