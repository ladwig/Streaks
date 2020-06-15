import React from 'react';
import { Text, Button, View, Dimensions } from 'react-native';
import { AuthContext } from '../context';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
  }