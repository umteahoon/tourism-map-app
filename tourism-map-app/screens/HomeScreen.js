import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { fetchTourData } from '../services/tourApi';

const HomeScreen = () => {
  const [areaCode, setAreaCode] = useState('1');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await fetchTourData(areaCode);
    setResults(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={areaCode}
        onChangeText={setAreaCode}
        placeholder="지역 코드 입력 (예: 1)"
      />
      <Button title="검색" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});

export default HomeScreen;