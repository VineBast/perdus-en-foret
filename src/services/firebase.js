// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDXfCMyi605QHwheWfNyI3TZhk4Phwo1jg',
  authDomain: 'perdu-en-foret.firebaseapp.com',
  projectId: 'perdu-en-foret',
  storageBucket: 'perdu-en-foret.appspot.com',
  messagingSenderId: '997177063904',
  appId: '1:997177063904:web:204e815d7e55358a075385',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = getFirestore(app);

const createUser = async (newUser, navigation) => {
  auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      navigation.replace('HomeScreen');
      setDoc(doc(db, 'users', user.uid), {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        tel: newUser.tel,
        favoris: [],
        uid: user.uid,
      });
    })
    .catch((error) => alert(error.message));
};

const getUser = async () => {
  if (auth.currentUser !== null) {
    const q = query(
      collection(db, 'users'),
      where('email', '==', auth.currentUser.email)
    );

    let data;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });

    return data;
  } else return undefined;
};

// Exemple call updateUser() : 👇
//   if (user) {
//     async function test() {
//       await updateUser({
//         ...user,
//         favoris: ['coucou', 'test'],
//       });
//     }
//     test();
//   }
const updateUser = async (userUpdate) => {
  await setDoc(doc(db, 'users', userUpdate.uid), {
    firstName: userUpdate.firstName,
    lastName: userUpdate.lastName,
    email: userUpdate.email,
    tel: userUpdate.tel,
    favoris: userUpdate.favoris,
    uid: userUpdate.uid,
  });
};

const logout = (navigation) => {
  auth
    .signOut()
    .then(() => {
      navigation.replace('StartScreen');
    })
    .catch((error) => alert(error.message));
};

const userLogin = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
};

const resetPasswordEmail = (navigation) => {
  const emailError = emailValidator(email.value);
  if (emailError) {
    setEmail({ ...email, error: emailError });
  }
  navigation.navigate('StartScreen');
};

export {
  auth,
  createUser,
  userLogin,
  getUser,
  logout,
  resetPasswordEmail,
  updateUser,
};
