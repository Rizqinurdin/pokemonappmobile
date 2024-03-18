import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CatchPokemonPage = ({ selectedPokemon, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png` }}
        />
      </View>
      <Text style={styles.title}>{selectedPokemon.name}</Text>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>CLOSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleCatchPokemon = (pokemonDetails) => {
    setSelectedPokemon(pokemonDetails);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Your existing code here */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <CatchPokemonPage selectedPokemon={selectedPokemon} onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
