import React from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { Input, Button, CheckBox } from '@ui-kitten/components';
import { AuthContext } from '../context';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';

export default function Profile() {
  const user = firebase.auth().currentUser;
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState('');
  const { signOut } = React.useContext(AuthContext);
  const [emailC, setEmailC] = React.useState(false);
  const [passwordC, setPasswordC] = React.useState(false);

  const saveChanges = () => {
    if(passwordC) {
      user.updatePassword(password).then(function () {
        alert("Password changed sucessfully")
      }).catch(function (error) {
        alert(error)
      });
    }
    if(emailC) {
      user.updateEmail(email.toLowerCase().split(' ').join('')).then(function () {
        alert("E-Mail changed sucessfully")
      }).catch(function (error) {
        alert(error)
      });
    }
  }
  
  return (
    <>
    <View style={styles.container}>
      <Input
        label="E-Mail"
        placeholder={"Current E-Mail"}
        value={email}
        onChangeText={setEmail}
        onChange={ () => setEmailC(true)}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="username"
        style={styles.form}
      />
       <Input
        label="Password"
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        onChange={ () => setPasswordC(true)}
        secureTextEntry
        style={styles.form}
      />
    <Button disabled={false} style={styles.form} onPress={() => saveChanges()}>
        Save Changes
    </Button>  
    <Button appearance='outline' status='danger' style={styles.form} onPress={() => signOut()}>
        Sign out
    </Button>
    </View>
    
    </>
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
});