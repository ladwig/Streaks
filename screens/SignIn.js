import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
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
        <ImageBackground source={require('../assets/bg.jpg')} style={{ width: '100%', height: '100%', backgroundColor: Colors.lightOrange}}>
            <View style={styles.container}>
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
                <Button status='primary' style={styles.form} onPress={() => signIn({ email, password })}>Sign in</Button>
                <Text style={styles.button} onPress={() => navigation.push("CreateAccount")}>No account yet? Create one!</Text>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    form: {
        width: 300,
        marginBottom: 10
    },
    button: {
        marginTop: 5,
        color: Colors.white,
        fontWeight: 'bold'
    }
});