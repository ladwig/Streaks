import React from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from "../context";

export default function SignIn({navigation}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
      });

    return (
        <View style={styles.container}>
                 <LinearGradient
                    colors={['rgba(255,214,171,1)', 'rgba(255,182,182,1)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 1000,
          }}
        />
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