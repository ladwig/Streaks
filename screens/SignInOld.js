import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context';
import Colors from '../constants/Colors'
import Logo from '../components/Logo.js';

export default function SignIn({ navigation }) {
    const [email, setEmail] = React.useState('ladwig.daniel@icloud.com');
    const [password, setPassword] = React.useState('12345678');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*  <LinearGradient
                    colors={[Colors.orangeBackground, Colors.pinkBackground]}
          style={styles.gradient}
        /> */}
            <Logo />
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