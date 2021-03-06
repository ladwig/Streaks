import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from "./context";
import * as firebase from 'firebase';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Device from 'expo-device';

import { storeUserData } from './databaseActions';


/* Import all Screens */
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Splash from './screens/Splash';
import CreateAccount from './screens/CreateAccount';
import Profile from './screens/Profile';
import AddNewStreak from './screens/AddNewStreak';

import ApiKeys from './constants/ApiKeys';

/* Only starts firebase once */
if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    alert(error);
  }
}

retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    else {
      return null;
    }
  } catch (error) {
    // Error retrieving data
  }
};

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
const ProfileStack = createStackNavigator();
const AddStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile}
      options={({ navigation }) => ({
        title: 'Edit Profile',
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        ),
      })}
    />
  </ProfileStack.Navigator>
);

const AddStackScreen = () => (
  <AddStack.Navigator>
    <AddStack.Screen name="AddNewStreak" component={AddNewStreak}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        ),
      })}
    />
  </AddStack.Navigator>
);
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerStyle={{
    backgroundColor: '#fff',
    width: 200,
  }}
    drawerContentOptions={{
      activeTintColor: '#FFB248',
      itemStyle: { marginVertical: 5 },
    }}>
    <Drawer.Screen name="Home" component={HomeStackScreen} />
    <Drawer.Screen name="AddNewStreak" component={AddStackScreen} options={{ title: "Add a Loop" }} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
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
          storeData('userId', firebasedata.user.uid);
          setUserToken(firebasedata.user.uid);
          const userData = {
            lastSignIn: Date.now()
          }
          storeUserData('users', userData);
          setIsLoading(false);
        })
          .catch(function (error) {
            alert(error.message);
          })

      },
      signUp: async data => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function (firebasedata) {
          storeData('userId', firebasedata.user.uid);
          setUserToken(firebasedata.user.uid);
          const userData = {
            firstName: data.firstName,
            email: data.email,
            firstSignIn: Date.now(),
            lastSignIn: Date.now(),
            deviceModel: Device.modelName
          }
          storeUserData('users', userData);
          setIsLoading(false);
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
    }, 2000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} >
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
}
