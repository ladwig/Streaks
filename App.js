import * as React from 'react';
import { AsyncStorage, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from "./context";
import * as firebase from 'firebase';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Splash from './screens/Splash';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';
/* import SignUp from './screens/SignUp'; */
import ApiKeys from './constants/ApiKeys';

firebase.initializeApp(ApiKeys.FirebaseConfig);

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(error) {
    alert(error);
  }
}

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In", headerShown: false }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerStyle={{
    backgroundColor: '#fff',
    width: 240,
  }}>
    <Drawer.Screen name="Home" component={HomeStackScreen} />
    <Drawer.Screen name="Profile" component={Profile} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: async data => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function (firebasedata) {
          alert(firebasedata.user.uid);
          storeData('userid', firebasedata.user.uid);
          setUserToken(firebasedata.user.uid);
          setIsLoading(false);
        })
          .catch(function (error) {
            alert(error.message);
          })
      },
      signUp: async data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function (firebasedata) {
          alert(firebasedata.user.uid)
          storeData('userid', firebasedata.user.uid);
          setIsLoading(false);
          setUserToken(firebasedata.user.uid);
        })
          .catch(function (error) {
            alert(error.message);
          })
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
       <ApplicationProvider {...eva} theme={eva.light} >
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}
