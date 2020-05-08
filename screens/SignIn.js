import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
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

    return (
        <View style={styles.container}>
                 <LinearGradient
                    colors={['rgba(255,214,171,1)', 'rgba(255,182,182,1)']}
          style={styles.gradient}
        />
            <Input
                placeholder="E-Mail"
                value={email}
                onChangeText={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="username"
                style={styles.form}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                autoCompleteType="password"
                style={styles.form}
            />
                <Button status='primary' style={styles.form} onPress={() => signIn({ email, password })}>
      Sign in
    </Button>
    <Button appearance='outline' status='basic'
       style={styles.form} onPress={() => navigation.push("CreateAccount")}>
      Create Account
    </Button>
        </View>
    );
}