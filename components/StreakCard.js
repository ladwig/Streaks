import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import { addOneToCounter, updateCounter, deleteOneStreak } from '../databaseActions';
import AddNewStreak from '../screens/AddNewStreak';


//Returns the right word as a string for a given interval to display it, 1 -> Day , 2 -> 2 Days , 7 -> 7 Days
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

//Handler for each streak counter, still in progress


//Handle a long press and shows an alert with a delete option (calls firebase delete function)
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
        text: 'Cancel',       
        style: 'cancel',     
      }
    ],   
    { cancelable: false }, 
  );
}

export default function StreakCard(props) {
  const navigation = useNavigation();
  const [countAllowed, setCountAllowed] = React.useState(false);

  const counterStatus = (streakInterval, lastUpdate) => {
    const midnight = new Date().setHours(24, 0, 0, 0);
    const now = Date.now();
    const timeRemaining = midnight - now;
    let status = 1;
    switch (streakInterval) {
      /* one day */
      case 1:
         /* When counter is clickable */
        if ((lastUpdate + 86400 + timeRemaining) < now) {
        console.log(props.streakId + ': clickable')
         status = 0;
        }
        /* When counter is too new to get clicked one more time */
/*         else if(((lastUpdate + 86400 + timeRemaining) < now) && (now > lastUpdate )) {
          status = 1;
          console.log('status: too new')
        } */
        else if(((lastUpdate + 10) <= now) && (now > lastUpdate )) {  /*  now >= (lastUpdate + (zeit bis Mitternacht von lastUpate)) && now < (lastUpdate + 86400 + timeRemaining))*/
          status = 1;
          console.log(props.streakId + ':too new')
        }
        
        /* When counter is to old to get clicked --> should reset counter to 0 */
        else {
          status = 2;
          console.log('status: too old, reset')
          /* function --> updateCounter(id) */ 
        }
        break;
      /* every two days */
      case 2:
        if (lastUpdate < (Date.now() - 172800)) {
        
        }
        break;
      /* every week */
      case 7:
        if (lastUpdate < (Date.now() - 604800)) {
       
        }
        break;
    }
    return status;
  }

  if (props.isAddCard) {

    /* Shows a custom card which links to the AddNewStreak screen */
    return (
      <Card style={styles.addIconContainer} onPress={() => navigation.navigate(AddNewStreak)}>
        <Ionicons name="ios-add-circle-outline" size={64} color={Colors.mainColor} />
      </Card>
    );
  }

   /*  Gets rendered, when you're not allowed to add one to the counter, for example when u already pressed the counter for today */
  if ((counterStatus(props.streakInterval, props.lastUpdate)) === 1) {
    return (
      <Card style={styles.streakContainerBlocked} activeOpacity={0.8} onLongPress={ () => handleLongPress(props.streakId)}>
      <View style={styles.streakNameContainer}>
        <Text style={[styles.streakName, styles.textColorBlocked]}>{props.icon} {props.streakName}</Text>
      </View>
      <View style={styles.streakCounterContainer}>
        <Text style={[styles.streakCounter, styles.textColorBlocked]}>{props.streakCounter}</Text>
      </View>
      <View style={styles.streakIntervalContainer}>
        <Text style={styles.textColorBlocked}>{showMeInterval(props.streakInterval)}</Text>
      </View>
    </Card>
    );
  }

  return (
    <Card style={styles.streakContainer} activeOpacity={0.8} onLongPress={ () => handleLongPress(props.streakId)} onPress={() => addOneToCounter(props.streakId)}>
 
      <View style={styles.streakNameContainer}>
        <Text style={[styles.streakName, styles.textColor]}>{props.icon} {props.streakName}</Text>
      </View>
      <View style={styles.streakCounterContainer}>
        <Text style={[styles.streakCounter, styles.textColor]}>{props.streakCounter}</Text>
      </View>
      <View style={styles.streakIntervalContainer}>
        <Text style={styles.textColor}>{showMeInterval(props.streakInterval)}</Text>
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