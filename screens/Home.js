import React from 'react';
import { Text, Button, View } from 'react-native';
import { AuthContext } from "../context";

export default function Home({navigation}){
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}