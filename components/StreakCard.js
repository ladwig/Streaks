import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import { addOneToCounter, deleteOneStreak, minusOneFromCounter } from '../databaseActions';
import AddNewStreak from '../screens/AddNewStreak';

// Returns the right word as a string for a given interval to display it, 1 -> Day , 2 -> 2 Days , 7 -> 7 Days
const showMeInterval = (interval, counter) => {
  let result = "Interval";
  switch (true) {
    case ((interval == 1) && (counter != 1)):
      result = "Days"
      break;
    case ((interval == 1) && (counter == 1)):
      result = "Day"
      break;
    case ((interval == 2) && (counter != 1)):
      result = "2nd Days"
      break;
    case ((interval == 2) && (counter == 1)):
      result = "2nd Day"
      break;
    case ((interval == 7) && (counter != 1)):
      result = "Weeks"
      break;
    case ((interval == 7) && (counter == 1)):
      result = "Week"
      break;
  }
  return result;
}

// Handle a long press and shows an alert with a delete option (calls firebase delete function)
const handleLongPress = (streakId) => {
  Alert.alert(
    'Delete this Streak',
    'Are you sure?',
    [
      {
        text: 'Yes',
        onPress: () => deleteOneStreak(streakId)
      },
      {
        text: 'Undo the last press (beta)',
        onPress: () => minusOneFromCounter(streakId) // Works but needs still some fixes! You aren't able to count again when you are did undo
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
}

export default function StreakCard(props) {
  const navigation = useNavigation();

  if (props.isAddCard) {

    // Shows a custom card which links to the AddNewStreak screen 
    return (
      <Card style={styles.addIconContainer} onPress={() => navigation.navigate('AddNewStreak')}>
        <Ionicons name="ios-add-circle-outline" size={64} color={Colors.mainColor} />
      </Card>
    );
  }

  //  Gets rendered, when you're not allowed to add one to the counter (when you already updated it in the given interval) 
  if (!props.isEditable && props.streakCounter != 0) {
    return (
      <Card style={styles.streakContainerBlocked} activeOpacity={0.8} onLongPress={() => handleLongPress(props.streakId)}>
        <View style={styles.streakNameContainer}>
          <Text style={[styles.streakName, styles.textColorBlocked]}>{props.icon} {props.streakName}</Text>
        </View>
        <View style={styles.streakCounterContainer}>
          <Text style={[styles.streakCounter, styles.textColorBlocked]}>{props.streakCounter}</Text>
        </View>
        <View style={styles.streakIntervalContainer}>
          <Text style={styles.textColorBlocked}>{showMeInterval(props.streakInterval, props.streakCounter)}</Text>
        </View>
      </Card>
    );
  }

  if (props.streakCounter == 0) {
    return (
      <Card style={styles.streakContainerZero} activeOpacity={0.8} onLongPress={() => handleLongPress(props.streakId)} onPress={() => addOneToCounter(props.streakId)}>

      <View style={styles.streakNameContainer}>
        <Text style={[styles.streakName, styles.textColor]}>{props.icon} {props.streakName}</Text>
      </View>
      <View style={styles.streakCounterContainer}>
        <Text style={[styles.streakCounter, styles.textColor]}>{props.streakCounter}</Text>
      </View>
      <View style={styles.streakIntervalContainer}>
        <Text style={styles.textColor}>{showMeInterval(props.streakInterval, props.streakCounter)}</Text>
      </View>
    </Card>
  );
  }

  /*  Gets rendered, when you're allowed to add one to the counter  */
  return (
    <Card style={styles.streakContainer} activeOpacity={0.8} onLongPress={() => handleLongPress(props.streakId)} onPress={() => addOneToCounter(props.streakId)}>

      <View style={styles.streakNameContainer}>
        <Text style={[styles.streakName, styles.textColor]}>{props.icon} {props.streakName}</Text>
      </View>
      <View style={styles.streakCounterContainer}>
        <Text style={[styles.streakCounter, styles.textColor]}>{props.streakCounter}</Text>
      </View>
      <View style={styles.streakIntervalContainer}>
        <Text style={styles.textColor}>{showMeInterval(props.streakInterval, props.streakCounter)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  streakContainer: {
    width: "100%",
    marginTop: 10,
    height: 120,
    backgroundColor: Colors.white,
  },
  streakContainerBlocked: {
    width: "100%",
    marginTop: 10,
    height: 120,
    backgroundColor: Colors.green,
    opacity: 1.0
  },
  streakContainerZero: {
    width: "100%",
    marginTop: 10,
    height: 120,
    backgroundColor: Colors.white,
    opacity: 0.6
  },
  streakCounterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  streakNameContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  streakIntervalContainer: {
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginTop: 10,
    height: 120
  },
  streakName: {
    fontSize: 30,
    position: "absolute",
    top: 30,
    marginLeft: -10,

  },

  textColor: {
    color: Colors.mainText,
  },
  textColorBlocked: {
    color: Colors.white,
  },

  streakCounter: {
    fontSize: 50,

  },
  streakInterval: {

  },
});