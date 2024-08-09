import React, { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";


function Segundo() {

  const [user, setUser] = useState<User[]>([])

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/users/getUsers')
      setUser(response.data);
    } catch (error) {
      console.warn('Erro', error)
    }
  }

  const handleDelete = async (id: any) => { }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <View style={style.container}>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.itemContainer}>
            <Text style={style.itemText}>Email: {item.email}</Text>
            <Text style={style.itemText}>Nome: {item.name}</Text>
            {/* <View style={style.buttonContainer}>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={style.button}>
                <Icon name="delete" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View> */}
          </View>
        )}
        contentContainerStyle={style.flatlist}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  flatlist: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    padding: 8,
  }
})

interface User {
  id: number;
  email: string;
  name: string;
}

export default Segundo