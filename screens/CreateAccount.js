import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext } from "../context";
import { Input, Button } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  
  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,214,171,1)', 'rgba(255,182,182,1)']}
        style={styles.gradient}
      />
      <Input
        placeholder="How should we call u?"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.form}
      />
      <Input
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        style={styles.form}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.form}
      />
      <Button status='primary' style={styles.form} onPress={() => signUp({ email, password, firstName})}>
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