import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.0.117:3000/auth/register', {
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
                navigation.navigate('SignIn');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', "An error occurred. Please try again.");
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                label="Email"
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
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Register
            </Button>
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
});

export default RegisterScreen;
