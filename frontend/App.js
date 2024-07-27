import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [clothes, setClothes] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    axios.get('http://backend:5000/clothes')
      .then(response => setClothes(response.data))
      .catch(error => console.error(error));
  }, []);

  const addClothes = () => {    #변경 필요
    axios.post('http://backend:5000/addClothes', { name, type })
      .then(response => {
        setClothes([...clothes, response.data]);
        setName('');
        setType('');
      })
      .catch(error => console.error(error));
  };

  return (
    <View>
      <Text>Add Clothes</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Type (e.g., summer, winter)"
        value={type}
        onChangeText={setType}
      />
      <Button title="Add" onPress={addClothes} />
      <FlatList
        data={clothes}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
