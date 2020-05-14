import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from "../context";
import { Icon, Input, Button, Toggle, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { storeStreakData } from '../databaseActions';

const SelectData = [
  'Daily',
  'Every 2 day',
  'Weekly',
];

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const People = (props) => (
  <Icon {...props} name='people-outline'/>
);

const Brush = (props) => (
  <Icon {...props} name='brush-outline'/>
);


const test = (row) => {
  let test = null;
  switch(row) {
    case 0: 
      test = 1;
      break;
    case 1: 
      test = 2;
      break;
    case 2: 
      test = 7;
      break;
  }
  return test;
}

export default function AddNewStreak({ navigation }) {

  const [streak, setStreak] = React.useState('');
  const [interval, setInterval] = React.useState('daily');
  const [icon, setIcon] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = SelectData[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  let data = {
    streakName: streak,
    interval: test(selectedIndex.row),
    icon,
    dateAdded: Date.now(),
  }

  return (
    <View style={styles.container}>
      <Text>Add a new Streak</Text>

       <Button
          style={styles.button}
          appearance='ghost'
          accessoryLeft={StarIcon}
        />
         <Button
          style={styles.button}
          appearance='ghost'
          accessoryLeft={Brush}
        />
         <Button
          style={styles.button}
          appearance='ghost'
          accessoryLeft={People}
        />

      <Input
        style={styles.form}
        label="New Streak"
        value={streak}
        onChangeText={setStreak}
      ></Input>

        <Select
        style={styles.form}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {SelectData.map(renderOption)}
      </Select>

      <Button onPress={() => storeStreakData("streaks", data)}>Save</Button>
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