import  React, { useEffect, useState } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { getStreakData } from '../databaseActions';
import { useFocusEffect } from '@react-navigation/native';

import StreakCard from '../components/StreakCard';


export default function Home({navigation}){
   
    /*      {(streaks == null) ? (<Text>leeer</Text>) : (Object.values(streaks).map((item) => <Text>{item.streakName} </Text>))}  */
  
  return (
    <View style={styles.container}>
      <StreakCard style={styles.box} percent="10%" streakName="Running"/>
      <StreakCard style={styles.box} percent="50%" streakName="Smoking"/>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: 'wrap',
  },
});
