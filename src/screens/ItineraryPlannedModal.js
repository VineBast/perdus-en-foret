import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { LatLngInput, SwitchArrowIcon } from '../components';
import { colors, general } from '../core/theme';
import { getUser } from '../services/firebase';

export function ItineraryPlannedModal({ navigation }) {
  const [user, setUser] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [geoPoints, setGeoPoints] = useState([
    {
      lat: '48,2501',
      lng: '2,1089',
    },
    {
      lat: '2',
      lng: '',
    },
  ]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const openItineraryScreen = () => {
    setModalVisible(false);
    navigation.navigate('ItineraryScreen');
  };

  const ModalOpenContainer = () => {
    return (
      <ScrollView
        style={[style.modalOpenContainer]}
        keyboardDismissMode={'on-drag'}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            {geoPoints.map((point, i) => {
              const isLast = i === geoPoints.length - 1;
              return (
                <LatLngInput
                  key={i}
                  lat={point.lat}
                  lng={point.lng}
                  isLast={isLast}
                  style={{ marginBottom: isLast ? 0 : 10 }}
                />
              );
            })}
          </View>
          <View style={{ width: 17 }}>
            <SwitchArrowIcon color='#fff' />
          </View>
        </View>
        {/* <ClassicButton onPress={openItineraryScreen}>
        Voir l'initéraire
      </ClassicButton> */}
      </ScrollView>
    );
  };

  const ModalCloseContainer = () => (
    <View style={[style.modalColseContainer]}></View>
  );

  return (
    <>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={style.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[style.modalOpenBackground]}>
          <ModalOpenContainer />
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
  modalOpenContainer: {},
  modalColseContainer: {},
  modalOpenBackground: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
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
