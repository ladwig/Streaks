import React from 'react';
import { Text, Button, View, Dimensions } from 'react-native';
import { AuthContext } from '../context';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
      <LineChart
    data={{
      labels: ["January", "February", "March", "April"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width}
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={5} // optional, defaults to 1
    chartConfig={{
  
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 0, 244, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    </View>
  );
  }