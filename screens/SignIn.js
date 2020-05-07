import React from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { AuthContext } from "../context";

export default function SignIn({navigation}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="E-Mail"
                value={email}
                onChangeText={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="username"

            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                autoCompleteType="password"
            />
            <Button title="Sign in" onPress={() => signIn({ email, password })} />
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
        </View>
    );
}