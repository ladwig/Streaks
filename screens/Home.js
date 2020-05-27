import  React, { useEffect, useState } from 'react';
import { Text, Button, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getStreakData, storeStreakData, addOneToCounter } from '../databaseActions';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

import StreakCard from '../components/StreakCard';
import StreakCardAdd from '../components/StreakCard';


export default function Home({navigation}){
   
  const test = () => {
    getStreakData().then(function(data) {
      (Object.values(data).map((item) =>console.log(item.streakName)))
    })
  } 
    /*      {(streaks == null) ? (<Text>leeer</Text>) : (Object.values(streaks).map((item) => <Text>{item.streakName} </Text>))}  */
  return (
<SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.welcomeText}>Hey, Daniel 👋</Text>
        <StreakCard streakName="🏃 Running" streakCounter="10" streakInterval="1"/>
        <StreakCard streakName="🚭 No Smoking" streakCounter="2" streakInterval="2"/>
        <StreakCard streakName="📖 Reading" streakCounter="3" streakInterval="1"/>
        <StreakCard streakName="🏊 Swimming" streakCounter="0" streakInterval="7"/>
        <StreakCardAdd navigation isAddCard/>
        {test()}
        <Button title="test" onPress={ () => addOneToCounter("-M8L-KHXYLG2zXhjeoUo")}/>
      </ScrollView>
    </SafeAreaView>
  );
}

/* const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: 'wrap',
  },
});
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F2F2F7"

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