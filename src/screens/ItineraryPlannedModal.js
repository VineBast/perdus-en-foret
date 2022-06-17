import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { LatLngInput, SubmitButton, SwitchArrowIcon, Modal, TopIndicator, FilterModalSwitch, AddPointButton, MarkerIcon } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, font, general, position } from '../core/theme';
import { getUser } from '../services/firebase';
import uuid from 'react-native-uuid';
import Svg, { Circle } from 'react-native-svg';

export function ItineraryPlannedModal({ navigation }) {
  const [user, setUser] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);
  const [geoPoints, setGeoPoints] = useState([]);
  const [recentPoints, setRecentPoints] = useState([]);
  const [favoritePoints, setFavoritePoints] = useState([]);

  useEffect(() => {
    setUser(getUser());
    setGeoPoints([
      {
        id: uuid.v4(),
        lat: '',
        lng: '',
      },
      {
        id: uuid.v4(),
        lat: '',
        lng: '',
      }
    ]);
    setRecentPoints([
      {
        id: uuid.v4(),
        lat: '48.50679',
        lng: '2.05231',
        date: '12/06/2022'
      },
      {
        id: uuid.v4(),
        lat: '48.50679',
        lng: '2.05231',
        date: '12/06/2022'
      },
      {
        id: uuid.v4(),
        lat: '48.50679',
        lng: '2.05231',
        date: '12/06/2022'
      },
    ]);
    setFavoritePoints([
      {
        id: uuid.v4(),
        lat: '48.50679',
        lng: '2.05231',
        date: '12/06/2022'
      },
      {
        id: uuid.v4(),
        lat: '48.50679',
        lng: '2.05231',
        date: '12/06/2022'
      }
    ]);
  }, []);

  const openItineraryScreen = () => {
    setModalVisible(false);
    navigation.navigate('ItineraryScreen');
  };

  const addPoint = () => {
    setGeoPoints([
      ...geoPoints,
      {
        id: uuid.v4(),
        lat: '',
        lng: ''
      }
    ]);
  };

  const deletePoint = (selectedId) => {
    setGeoPoints(geoPoints.filter(point => point.id != selectedId));
  };

  const reverseGeoPoints = () => {
    setGeoPoints([...geoPoints].reverse());
  };

  const onChangeInput = ({ id, lat, lng }) => {
    setGeoPoints(geoPoints.map(point => point.id === id ? ({ ...point, lat: lat, lng: lng }) : point));
  }

  const openRecentOptions = () => {
    console.log('openRecentOptions');
  }

  const setSpecificPoint = () => {
    console.log('setSpecificPoint');
  }

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
                <SubmitButton label="Voir l'itinéraire" onPress={openItineraryScreen} style={{ marginVertical: 0 }} />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 14,
                }}
              >
                <View style={{ flex: 1 }}>
                  {geoPoints.map((point, i) => {
                    const isLast = i === geoPoints.length - 1;
                    return (
                      <LatLngInput
                        key={point.id}
                        point={point}
                        isLast={isLast}
                        showDelete={geoPoints.length > 2}
                        handleDelete={(id) => deletePoint(id)}
                        onChange={({ lat, lng }) => onChangeInput({ id: point.id, lat: lat, lng: lng })}
                        style={{ marginBottom: isLast ? 0 : 10 }}
                      />
                    );
                  })}
                </View>
                <SwitchArrowIcon color='#fff' onPress={reverseGeoPoints} />
              </View>
              <View style={[position.rowSpace, { marginTop: 14, alignItems: 'stretch' }]}>
                <FilterModalSwitch
                  onPress={() => setIsFavoriteSelected(!isFavoriteSelected)}
                  isFavoriteSelected={isFavoriteSelected}
                  style={{ marginRight: 5 }}
                />
                <AddPointButton
                  onPress={addPoint}
                  style={{ marginLeft: 5 }}
                />
              </View>
              <View style={{ marginTop: 14, borderRadius: 8, overflow: 'hidden' }}>
                {recentPoints.map((point, index) => {
                  const isLast = index === recentPoints.length - 1;

                  return (
                    <TouchableOpacity
                      onPress={() => setSpecificPoint(point)}
                      onLongPress={() => openRecentOptions(id)}
                      activeOpacity={0.8}
                      key={point.id}
                      style={[position.rowSpace, { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingVertical: 10, paddingHorizontal: 14, borderBottomColor: 'rgba(255, 255, 255, 0.2)', borderBottomWidth: isLast ? 0 : 1 }]}
                    >
                      {isFavoriteSelected ? <MarkerIcon color='rgba(255, 255, 255, 0.9)' /> : <Ionicons name='star' size={17} color='rgba(255, 255, 255, 0.9)' /> }
                      <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Text style={font.desc} numberOfLines={1}>Le {point.date}</Text>
                        <Text style={{ fontSize: 14, color: '#fff' }} numberOfLines={1}>{point.lat}, {point.lng}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => openRecentOptions(point.id)}
                        style={[position.rowSpace, { width: 18, paddingVertical: 12 }]}
                      >
                        {[...Array(3)].map((_ele, i) => (
                          <Svg key={i} width={4} height={4} viewBox='0 0 4 4' fill='#fff'>
                            <Circle cx={2} cy={2} r={2} />
                          </Svg>
                        ))}
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )
                })}
              </View>
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
