import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import axios from "axios";

function Primeiro() {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handlePost = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/users/createUsers', {
                name: name,
                email: email,
                password: password
            })
            if (response.status === 201) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                setEmail('');
                setName('');
                setPassword('');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
            }

        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar. Verifique seus dados e tente novamente.');
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Cadastros</Text>
                <View>
                    <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail}></TextInput>
                    <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName}></TextInput>
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword}></TextInput>
                </View>
                <View style={styles.button}>
                    <Button title="Cadastrar" onPress={handlePost}></Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center'
    },
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
    }
})
export default Primeiro