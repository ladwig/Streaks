import React from 'react';
import { Text, Button, View } from 'react-native';
import { getStreakData } from '../databaseActions';


export default function Home({navigation}){
  const test =  getStreakData();
  return (
    <View>
      <Text>Signed in!</Text>
      {test}
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
