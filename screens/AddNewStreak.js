import React from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from "../context";
import { Input, Button } from '@ui-kitten/components';

export default function AddNewStreak({navigation}) {
  return (
    <View>
      <Text>Add a new Streak</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
  }