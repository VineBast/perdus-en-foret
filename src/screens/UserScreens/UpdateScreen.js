import { useEffect, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { colors } from '../../core/theme';
import { BackButton, Background } from '../../components';


export function UpdateScreen({ navigation }) {


  useEffect(() => {
 
  }, []);

  return (
    <Background style={style.container}>
    <BackButton white goBack={navigation.goBack} />
      <View>
        <Text>UpdateScreen</Text>
      </View>
    </Background>
  );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: colors.darkGreen,
      },

});
