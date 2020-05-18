import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from "../context";
import { Input, Button, Autocomplete, AutocompleteItem, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { storeStreakData } from '../databaseActions';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const SelectData = [
  'Daily',
  'Every 2 day',
  'Weekly',
];

const runningIcon = () => (
  <FontAwesome5 name="running" size="32" color="blue"/>
);

const readingIcon = () => (
  <FontAwesome5 name="book" size="32" color="blue"/>
);

const smokeIcon = () => (
  <MaterialIcons name="smoke-free" size="32" color="blue"/>
);

const starIcon = () => (
  <FontAwesome5 name="star" size="32" color="blue"/>
);


const intervalChanger = (row) => {
  let intervalForDB = null;
  switch(row) {
    case 0: 
      intervalForDB = 1;
      break;
    case 1: 
      intervalForDB = 2;
      break;
    case 2: 
      intervalForDB = 7;
      break;
  }
  return intervalForDB;
}

const getIconForWord = (word) => {
  const inputWord = word.toLowerCase();
  let icon = starIcon;
   switch(inputWord) {
     case 'running':
        icon = runningIcon;
        break;
    case 'sport':
        icon = runningIcon;
        break;
        case 'run':
          icon = runningIcon;
          break;
      case 'smoking':
        icon = smokeIcon;
        break;
      case 'no smoking':
        icon = smokeIcon;
        break;
        case 'read':
        icon = readingIcon;
        break;
        case 'reading':
          icon = readingIcon;
          break;
   }
   return icon;
}

export default function AddNewStreak({ navigation }) {
  const [streak, setStreak] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = SelectData[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem key={title} title={title}/>
  );

  let data = {
    streakName: streak,
    interval: intervalChanger(selectedIndex.row),
    dateAdded: Date.now(),
  }

  return (
    <View style={styles.container}>
      <Text>Add a new Streak</Text>
       <Button
          style={styles.button}
          appearance='ghost'
          accessoryLeft={getIconForWord(streak)}
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