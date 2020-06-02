import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import { addOneToCounter, updateCounter } from '../databaseActions';
import AddNewStreak from '../screens/AddNewStreak';

const showMeInterval = (interval) => {
  let result = "null";
  switch (interval) {
    case 1:
      result = "Days"
      break;
    case 2:
      result = "2nd Days"
      break;
    case 7:
      result = "Weeks"
      break;
  }
  return result;
}

const handleCounter = (streakInterval, lastUpdate) => {
  const midnight = new Date().setHours(24, 0, 0, 0);
  const now = Date.now();
  const timeRemaining = midnight - now;

  switch (streakInterval) {
    case 1:
      if ((lastUpdate + 86400 + timeRemaining) > now) {
        console.log("ist im Rahmen")
      }
      else{console.log("ist nicht im Rahmen")}
      break;
    case 2:
      if (lastUpdate < (Date.now() - 172800)) {
      
      }
      break;
    case 7:
      if (lastUpdate < (Date.now() - 604800)) {
     
      }
      break;
  }
}

export default function StreakCard(props) {
  const navigation = useNavigation();

  if (props.isAddCard) {
    return (
      <Card style={styles.addIconContainer} onPress={() => navigation.navigate(AddNewStreak)}>
        <Ionicons name="ios-add-circle-outline" size={64} color={Colors.green} />
      </Card>
    );
  }
  return (
    <Card style={styles.streakContainer} onPress={() => addOneToCounter(props.streakId)}>
      <View style={styles.streakNameContainer}>
        <Text style={styles.streakName}>{props.icon} {props.streakName}</Text>
      </View>
      <View style={styles.streakCounterContainer}>
        <Text style={styles.streakCounter}>{props.streakCounter}</Text>
      </View>
      <View style={styles.streakIntervalContainer}>
        <Text style={styles.streakInterval}>{showMeInterval(props.streakInterval)}</Text>{handleCounter(props.streakInterval, props.lastUpdate)}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  streakContainer: {
    width: "100%",
    marginTop: 10,
    height: 150,
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
    height: 150
  },
  streakName: {
    fontSize: 30,
    position: "absolute",
    top: 30,
    marginLeft: -10
  },
  streakCounter: {
    fontSize: 50,
  },
  streakInterval: {
  },
});