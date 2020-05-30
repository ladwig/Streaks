import React, { useEffect, useState, useMemo } from 'react';
import { Text, Button, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { subToStreakData, storeStreakData, addOneToCounter } from '../databaseActions';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

import StreakCard from '../components/StreakCard';

export default function Home({ navigation }) {

  const [streakData, setStreakData] = useState();
  const [username, setUserName] = useState();
  useEffect(() => {
    subToStreakData(
      function (data) {
        setStreakData(data);
      }
    )
  }, [setStreakData]);

  const cards = useMemo(() => {
    if(!streakData) {
      return ( <Text>loading...</Text>)
    }
    return Object.entries(streakData).map( ([itemId, itemData]) => {
      return(
        <StreakCard key={itemId} streakName={itemData.streakName} streakCounter={itemData.counter} streakInterval={itemData.interval} />
      )
    })
  }, [streakData])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.welcomeText}>Hey, Daniel 👋</Text>
        {cards}
        <StreakCard navigation isAddCard />
        <Button title="test" onPress={() => addOneToCounter("-M8L-KHXYLG2zXhjeoUo")} />
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