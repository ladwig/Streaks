import React from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { AuthContext } from "../context";

export default function SignUp(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signUp } = React.useContext(AuthContext);

  return (
    <View>
    <TextInput
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
    />
    <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
    />
        <TextInput
        placeholder="Repeat password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
    />
    <Button title="Sign up" onPress={() => signUp({ email, password })} />
    <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
</View>
  );
}