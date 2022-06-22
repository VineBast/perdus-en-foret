import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  BackButton,
  Background,
  SubmitButton
} from '../components';
import { colors } from '../core/theme';
import { userSelector } from '../redux/userSlice';
import { logout } from '../services/firebase';

export function SettingsScreen({ navigation }) {
  const user = useSelector(userSelector).user;

  return (
    <Background style={styles.container}>
      <BackButton white goBack={navigation.goBack} />
      <View style={styles.bodyContainer}>
          <Image style={styles.avatar} source={{uri: 'https://docs.ypariset.fr/img/default-avatar.jpeg'}}/>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user?.firstName}</Text>
              <Text style={styles.info}>{user?.email} • {user?.tel} </Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              <View style={{width: '100%', marginTop: 30}}>
                <SubmitButton
                  orange
                  style={styles.button}
                  label='Déconnexion'
                  onPress={() => logout(navigation)}
                >
                Log out
                </SubmitButton>   
              </View>      
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGreen,
  },
  bodyContainer: {  
    marginTop: 150
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
  },
  name:{
    fontSize:22,
    color: colors.white,
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: colors.white,
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: colors.green,
    marginTop:10
  },
  description:{
    fontSize:16,
    color: colors.white,
    marginTop:10,
    textAlign: 'center'
  },
});
