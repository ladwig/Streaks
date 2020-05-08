import React from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';

export default function Splash(){
    return (
      <View style={[styles.container, styles.horizontal]}>
           <ActivityIndicator size="large" color="rgba(255,182,182,1)" />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});