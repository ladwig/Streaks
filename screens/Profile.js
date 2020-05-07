import React from 'react';
import { Text, Button, View } from 'react-native';
import { AuthContext } from "../context";

export default function Profile() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
  }