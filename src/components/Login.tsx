import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        try {
            axios.post('http://10.0.2.2:3000/auth/login', {
                email: email,
                password: password
            })
        } catch (error) {
            Alert.alert("Erro", `Erro ${error}`)
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Login</Text>
                <View>
                    <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail}></TextInput>
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword}></TextInput>
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText} onPress={handleLogin}> Login </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        color: '#333',
        textAlign: 'center'
    },
    input: {
        height: 48,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 16
    },
    loginButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
        marginTop: 8
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})
export default Login