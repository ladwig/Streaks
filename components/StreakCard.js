import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';


export default function StreakCard(props) {
  const [percent, setPercent] = React.useState(props.percent);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "rgba(255,182,182,1)",
    },
    streakContainer: {
      height: 100,
      borderBottomWidth: 1,
      width: Dimensions.get("window").width
    },
    streakProgress: {
      width: percent,
      height: 100,
      backgroundColor: "rgba(255,214,171,1)"
    },
  });

    return (
      <View style={styles.container}>
      <View style={styles.streakContainer}>
      <Text style={styles.streakName}>{props.streakName}</Text>
        <View style={styles.streakProgress}>
          {console.log(props.percent)}
        </View>
        </View>
      </View>
    );
    }
