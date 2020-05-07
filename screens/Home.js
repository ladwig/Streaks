import React from 'react';
import { Text, Button, View } from 'react-native';

export default function Home({navigation}){
  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}