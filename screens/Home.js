import  React, { useEffect, useState } from 'react';
import { Text, Button, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getStreakData } from '../databaseActions';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

import StreakCard from '../components/StreakCard';


export default function Home({navigation}){
   
    /*      {(streaks == null) ? (<Text>leeer</Text>) : (Object.values(streaks).map((item) => <Text>{item.streakName} </Text>))}  */
  
  return (
    
<SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
    
        <StreakCard streakName="Test" percent="10%"/>
        <StreakCard streakName="Test" percent="14%"/>
        <StreakCard streakName="Test" percent="45%"/>
        <StreakCard streakName="Test" percent="100%"/>
        <StreakCard streakName="Test" percent="1%"/>

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
  },
  scrollView: {
    backgroundColor: '#fff',
  }
});