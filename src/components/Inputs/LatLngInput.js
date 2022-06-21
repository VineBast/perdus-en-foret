import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, position } from '../../core/theme';
import { CircleIcon, MarkerIcon } from '../Icons';

export function LatLngInput({
  point,
  style,
  isLast,
  showDelete,
  handleDelete,
  onChange,
}) {
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');

  const filterToNumber = (string) => {
    string = string.replace(/,/g, '.');
    return string.replace(/[^0-9.]/g, '');
  };

  const changeLatInput = (latitude) => {
    const filteredLatitude = filterToNumber(latitude);
    setLatInput(filteredLatitude);
    onChange({ latitude: filteredLatitude });
  };

  const changeLngInput = (longitude) => {
    const filteredLongitude = filterToNumber(longitude);
    setLngInput(filteredLongitude);
    onChange({ longitude: filteredLongitude });
  };

  useEffect(() => {
    setLngInput(point.longitude.toString());
    setLatInput(point.latitude.toString());
  }, [point]);

  return (
    <View style={styles.container}>
      <View style={styles.step}>
        {!isLast ? (
          <>
            <View style={[{ height: 20 }, position.columnCenter]}>
              <CircleIcon color='#fff' />
            </View>
            <View style={[position.columnCenter, { marginTop: 6 }]}>
              {[...Array(3)].map((_, i) => (
                <Svg
                  key={i}
                  style={{ marginBottom: 5 }}
                  width={8}
                  height={8}
                  viewBox='0 0 8 8'
                  fill='#fff'
                >
                  <Circle cx={4} cy={4} r={3} />
                </Svg>
              ))}
            </View>
          </>
        ) : (
          <MarkerIcon color={colors.orange} />
        )}
      </View>
      <View style={[styles.inputWrapper, { ...style }]}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => changeLatInput(value)}
          value={latInput}
          placeholder='latitude...'
          placeholderTextColor={colors.disabledText}
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          onChangeText={(value) => changeLngInput(value)}
          value={lngInput}
          placeholder='longitude...'
          placeholderTextColor={colors.disabledText}
        />
        {showDelete && (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => handleDelete(point.id)}
            style={styles.deleteWrapper}
          >
            <Ionicons name='close-outline' size={14} color={colors.dark} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 27,
  },
  step: {
    position: 'absolute',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 19,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    height: 58,
  },
  input: {
    color: '#fff',
    fontSize: 17,
    color: colors.black,
    flex: 1,
    width: '100%',
  },
  separator: {
    height: 28,
    width: 1,
    backgroundColor: colors.grey,
    marginHorizontal: 14,
  },
  deleteWrapper: {
    padding: 4,
    backgroundColor: '#eee',
    borderRadius: 50,
  },
});
