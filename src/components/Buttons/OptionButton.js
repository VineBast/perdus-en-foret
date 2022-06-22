import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../core/theme';
import {
  addItinerary,
  cleanUserOnLogout,
  userSelector,
} from '../../redux/userSlice';
import { logout } from '../../services/firebase';
import { TextInput } from '../Inputs';

export function OptionButton({ navigation, favorite, print, isOpen, pin }) {
  //Redux
  const dispatch = useDispatch();
  const user = useSelector(userSelector).user;

  const [optionOpen, setOptionOpen] = useState(isOpen);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');

  const onAddFavorite = () => {
    dispatch(
      addItinerary({
        ...user.currentItinerary,
        id: uuid.v4(),
        date: new Date().toString(),
        type: 'favorite',
        name: name,
      })
    );
    setModalVisible(false);
  };

  const onLogoutPress = () => {
    dispatch(cleanUserOnLogout());
    logout(navigation);
  };

  const renderOptions = () => {
    if (optionOpen) {
      return user.uid ? (
        <>
          <Pressable
            onPress={() => navigation.navigate('SettingsScreen')}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'settings'} size={20} color={colors.darkGreen} />
          </Pressable>
          {print && (
            <Pressable
              onPress={() => window.print()}
              style={[style.buttonRounded, style.smallButton]}
            >
              <Ionicons name={'print'} size={20} color={colors.darkGreen} />
            </Pressable>
          )}
          {favorite && (
            <Pressable style={[style.buttonRounded, style.smallButton]}>
              <Ionicons
                onPress={() => setModalVisible(true)}
                name={'star'}
                size={20}
                color={colors.darkGreen}
              />
            </Pressable>
          )}
          {pin && (
            <Pressable style={[style.buttonRounded, style.smallButton]}>
              <Ionicons
                onPress={pin}
                name={'pin'}
                size={20}
                color={colors.darkGreen}
              />
            </Pressable>
          )}

          <Pressable
            onPress={onLogoutPress}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'log-out'} size={20} color={colors.darkGreen} />
          </Pressable>
        </>
      ) : (
        <>
          {print && (
            <Pressable style={[style.buttonRounded, style.smallButton]}>
              <Ionicons name={'print'} size={20} color={colors.darkGreen} />
            </Pressable>
          )}
          {pin && (
            <Pressable style={[style.buttonRounded, style.smallButton]}>
              <Ionicons
                onPress={pin}
                name={'pin'}
                size={20}
                color={colors.darkGreen}
              />
            </Pressable>
          )}
          <Pressable
            onPress={() => navigation.navigate('StartScreen')}
            style={[style.buttonRounded, style.smallButton]}
          >
            <Ionicons name={'log-in'} size={20} color={colors.darkGreen} />
          </Pressable>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={style.container}>
      <Pressable
        onPress={() => setOptionOpen(!optionOpen)}
        style={[style.buttonRounded, { marginBottom: 5 }]}
      >
        <Ionicons
          name={optionOpen ? 'close' : 'ellipsis-horizontal'}
          size={30}
          color={colors.darkGreen}
        />
      </Pressable>
      {renderOptions()}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Entrer un nom pour votre favoris</Text>
            <TextInput label='Nom' value={name} onChangeText={setName} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onAddFavorite}
            >
              <Text style={styles.textStyle}>Ajouter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    right: 20,
    alignItems: 'center',
    zIndex: 99999,
  },
  smallButton: { width: 40, height: 40, marginTop: 5 },
  buttonRounded: {
    backgroundColor: colors.white,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: colors.grey,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
