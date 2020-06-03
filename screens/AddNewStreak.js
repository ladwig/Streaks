import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { AuthContext } from "../context";
import { Input, Button, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { storeStreakData } from '../databaseActions';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import Home from '../screens/Home';

const SelectData = [
  'Daily',
  'Every 2 day',
  'Weekly',
];

const intervalChanger = (row) => {
  let intervalForDB = null;
  switch (row) {
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

const iconSwitcher = (value) => {
  const input = value.toLowerCase().split(' ').join('');
  let icon = "🏆";
  switch(input) {
    case "sport":
    case "weightlifting":
    case "fitness":
    case "training":
      icon = "🏋";
      break;
    case "running":
    case "run":
    case "laufen":
    case "joggen":
      icon = "🏃";
      break;
    case "reading":
    case "read":
    case "lesen":
    case "lernen":
    case "study":
    case "buch":
    case "book reading":
      icon = "📚"
      break;
  }
    return icon;
}

export default function AddNewStreak({ navigation }) {
  const [streak, setStreak] = React.useState('');
  const [icon, setIcon] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const displayValue = SelectData[selectedIndex.row];

  const renderOption = (title) => (
    <SelectItem key={title} title={title} />
  );
  
  
  //Data that gets pushed to database
  let data = {
    streakName: streak,
    interval: intervalChanger(selectedIndex.row),
    dateAdded: Date.now(),
    lastUpdate: Date.now(),
    icon: iconSwitcher(streak),
    counter: 0,
  }

  //Handle the submit and pushes to home screen, still needs validation checks
  const handleSubmit = () => {
    storeStreakData("streaks", data);
    navigation.navigate(Home);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Let's add a new Streak</Text>
      <Text style={styles.icon}>{iconSwitcher(streak)}</Text>
      <Input
        style={styles.form}
        placerholder="New Streak"
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
      <Button onPress={() => handleSubmit()}>Save</Button>
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
    width: "80%",
    marginBottom: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1000,
  },
  headline: {
    marginLeft: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    fontSize: 30,
    fontWeight: "bold"
  },
  icon: {
    fontSize: 64,
    marginTop: "5%",
    marginBottom: "5%",
  }
});