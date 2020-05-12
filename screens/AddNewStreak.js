import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from "../context";
import { Input, Button, Toggle } from '@ui-kitten/components';
import { storeHabitData, storeUserData } from '../databaseActions';
import * as Device from 'expo-device';

export default function AddNewStreak({navigation}) {

  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  
  const test = {
    hans: 1,
    peter: 2
  }

  return (
    <View style={styles.container}>
      <Text>Add a new Streak</Text>
      <Input style ={styles.form} label="New Habit"></Input>
      <Toggle checked={checked} onChange={onCheckedChange} status="warning">
    </Toggle>
      <Button onPress={() => storeUserData("Daniel", "mail", Date.now(), Device.modelName)}>Test</Button>
      <Button onPress={() => storeHabitData("habits",test)}>Habit</Button>
    </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: 300,
        marginBottom: 10
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1000,
    },
  });