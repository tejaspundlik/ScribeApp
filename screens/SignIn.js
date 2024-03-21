import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://192.168.0.117:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                signIn();
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                label="Username"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign In
            </Button>
            <Text style={styles.registerLink} onPress={navigateToRegister}>Don't have an account? Register</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    registerLink: {
        textAlign: 'center',
        marginTop: 16,
        color: 'blue',
    },
});

export default SignInScreen;
