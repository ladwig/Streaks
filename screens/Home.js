import React, { useEffect, useState, useMemo } from 'react';
import { Text, Button, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { subToStreakData, subToUserData, updateCounter } from '../databaseActions';
import Colors from '../constants/Colors'
import ms from 'ms';
import StreakCard from '../components/StreakCard';

function modifyStreakData(streakData) {
  if(!(streakData == null || streakData == undefined)) {
  return Object.entries(streakData).map(([itemId, itemData]) => {
    const interval = ms(`${itemData.interval}d`);
    const lastUpdateDayEnd = new Date(itemData.lastUpdate).setHours(24, 0, 0, 0);
    const lastUpdateIntervalEnd = lastUpdateDayEnd + interval - ms('1d')

    if (Date.now() > (lastUpdateIntervalEnd + interval)) {
      //Reset the counter for the render function. The firebase counter data gets updated ansyc --> updateCounter
      updateCounter(itemId); 
      return [itemId, { ...itemData, counter: 0 }]
    }

    if (Date.now() > lastUpdateIntervalEnd) {
      return [itemId, { ...itemData, isEditable: true }]
    }
    return [itemId, itemData]

  })
}
}

export default function Home({ navigation }) {

  const [streakData, setStreakData] = useState();
  const [firstNameData, setFirstNameData] = useState();

  //Gets called at first render and everytime a streak gets added, deleted or updated
  useEffect(() => {
    subToStreakData(
      function (streakData) {
        setStreakData(modifyStreakData(streakData));
      }
    )
  }, [setStreakData]);

  //Gets called at first render and everytime the username gets changed
  useEffect(() => {
    subToUserData(
      function (userData) {
        setFirstNameData(userData.firstName);
      }
    )
  }, [setFirstNameData]);

  //Return and render function for the StreakCards, if there is no data it displays loading/info text, else it iterates and renders the cards
  const cards = useMemo(() => {
    if (!streakData) {
      return (<Text>Here is nothing, you want to add something?</Text>)
    }
    return streakData.map(([itemId, itemData]) => {
      return (
        <StreakCard key={itemId} streakId={itemId} icon={itemData.icon} streakName={itemData.streakName} streakCounter={itemData.counter} streakInterval={itemData.interval} lastUpdate={itemData.lastUpdate} isEditable={itemData.isEditable} />
      )
    })
  }, [streakData])

  //Return and render function for the username
  const firstName = useMemo(() => {
    if (!firstNameData) {
      return (<Text style={styles.welcomeText}>Hey ...... 👋</Text>)
    }
    return (<Text style={styles.welcomeText}>Hey, {firstNameData} 👋</Text>)
  }, [firstNameData])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {firstName}
        {cards}
        <StreakCard navigation isAddCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,

  },
  scrollView: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  welcomeText: {
    marginLeft: "2%",
    marginTop: "5%",
    marginBottom: "2%",
    fontSize: 30,
    fontWeight: "bold"
  }
});