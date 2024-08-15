import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, FlatList, StyleSheet, Alert, Modal, TextInput, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather'; // Importando a biblioteca de ícones

function Segundo() {
    const [user, setUser] = useState<User[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [update, setUpdate] = useState(false);
    const focus = useIsFocused();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:3000/users/getUsers');
            setUser(response.data);
        } catch (error) {
            console.warn('Erro', error);
        }
    };

    const deleteUser = async (id: any) => {
        axios.delete(`http://10.0.2.2:3000/users/delete/${id}`);
        Alert.alert("Sucesso", "Usuário deletado com sucesso.");
        setUpdate(!update);
    };

    const handleDelete = async (id: any) => {
        try {
            Alert.alert("Tem certeza?", "Usuário será deletado para sempre.", [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteUser(id) },
            ]);
        } catch (error) {
            Alert.alert("Erro", `${error}`);
        }
    };

    const handleEdit = async (id: any) => {
        try {
            const data: { name: string; email: string; password?: string } = {
                name: name,
                email: email,
            };
            if (password) {
                data.password = password;
            }
            const response = await axios.patch(`http://10.0.2.2:3000/users/edit/${id}`, data);
            setUpdate(!update);
            setModalVisible(false);
            Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
            return response;
        } catch (error) {
            Alert.alert("Erro", `${error}`);
        }
    };

    const openModal = (user: any) => {
        setSelectedUser(user);
        setEmail(user.email);
        setName(user.name);
        setPassword('');
        setModalVisible(true);
    };

    useEffect(() => {
        if (focus) fetchUserData();
    }, [focus, update]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de Usuários</Text>
            </View>
            <FlatList
                data={user}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: User }) => (
                    <UserCard
                        name={item.name}
                        email={item.email}
                        onEdit={() => openModal(item)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                contentContainerStyle={styles.cardList}
            />
            {selectedUser && (
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Editar usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => handleEdit(selectedUser.id)} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )}
        </View>
    );
}

function UserCard({ name, email, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.userInfo}>
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={onEdit}>
                    <Icon name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
                    <Icon name="trash-2" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
        marginTop: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cardList: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 16,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    userDetails: {
        gap: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#6c757d',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        width: 300,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 15,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 4,
        marginTop: 8,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

interface User {
    id: number;
    email: string;
    name: string;
}

export default Segundo;
