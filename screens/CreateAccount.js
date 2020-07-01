import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from "../context";
import { Input, Button } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const { signUp } = React.useContext(AuthContext);

 const handleSubmit = (email, password, firstName) => {
   if(firstName != '') {
    signUp({ email, password, firstName})
   }
   else{ alert("Sooo...whats your name?")}
 }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.mainColor, Colors.lightOrange]}
        style={styles.gradient}
      />
      <Input
       label="Your Name"
        placeholder="Maxi"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.form}
      />
      <Input
        label="E-Mail"
        placeholder="maxi@online.de"
        value={email}
        onChangeText={setEmail}
        style={styles.form}
      />
      <Input
        label="Password"
        placeholder="•••••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.form}
      />
      <Button status='primary' style={styles.form} onPress={() => handleSubmit(email, password, firstName)}>
        Create Account
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