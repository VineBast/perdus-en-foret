import { StyleSheet, Text, View } from 'react-native';
import { BackButton, Background } from '../../components';
import { colors } from '../../core/theme';

export function UpdateScreen({ navigation }) {
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
