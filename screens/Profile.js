import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { AuthContext } from '../context';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';

export default function Profile() {
  const user = firebase.auth().currentUser;
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState('●●●●');
  const navigation = useNavigation();
  const { signOut } = React.useContext(AuthContext);

  const saveChanges = () => {
    user.updateEmail(email).then(function () {
      alert("Changed sucessfully")
    }).catch(function (error) {
      alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <Input
        label="E-Mail"
        placeholder={"Current E-Mail"}
        value={email}
        onChangeText={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="username"
        style={styles.form}
      />
       <Input
        label="Password"
        placeholder="Current Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.form}
      />
    <Button status='primary' style={styles.form} onPress={() => saveChanges()}>
        Save Changes
    </Button>
    <Button status='basic' style={styles.form} onPress={() => navigation.goBack()}>
        Go back
    </Button>
    <Button status='warning' style={styles.form} onPress={() => signOut()}>
        Sign out
    </Button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    marginBottom: 10
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1000,
  },
});