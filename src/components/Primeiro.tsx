import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from "react-native";
import axios from "axios";

function Primeiro() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; name?: string; password?: string }>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState<{ email: boolean; name: boolean; password: boolean }>({
        email: false,
        name: false,
        password: false,
    });

    useEffect(() => {
        validateForm(); 
    }, [email, name, password]);

    const validateForm = () => {
        let errors: { email?: string; name?: string; password?: string } = {};

        if (!name) {
            errors.name = 'Nome é obrigatório.';
        }

        if (!email) {
            errors.email = 'E-mail é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'E-mail inválido.';
        }

        if (!password) {
            errors.password = 'Senha é obrigatória.';
        } else if (password.length < 6) {
            errors.password = 'Senha deve ter no mínimo 6 caracteres.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handlePost = async () => {
        if (isFormValid) {
            try {
                const response = await axios.post('http://10.0.2.2:3000/users/createUsers', {
                    name: name,
                    email: email,
                    password: password
                });

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
        } else {
            Alert.alert('Erro', 'O formulário contém erros. Corrija-os antes de continuar.');
        }
    };

    const handleBlur = (field: 'email' | 'name' | 'password') => {
        setTouched({ ...touched, [field]: true });
        validateForm();
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Cadastros</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={() => handleBlur('email')}
                    />
                    {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                        onBlur={() => handleBlur('name')}
                    />
                    {touched.name && errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        onBlur={() => handleBlur('password')}
                    />
                    {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                </View>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText} onPress={handlePost}> Cadastrar </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 8,
    },
    registerButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
        marginTop: 8
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Primeiro;
