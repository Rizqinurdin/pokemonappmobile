import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        setPokemonData(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonDetails(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching Pokemon details: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getItemId(item.url)}.png` }}
            opacity={1}
          />
        </View>
        <Text style={styles.text}>{item.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchPokemonDetails(item.name)}>
          <Text style={styles.buttonText}>DETAIL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getItemId = (url) => {
    const id = url.split('/').filter(Boolean).pop();
    return id;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>My Pokemon</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>POKÉMON LIST</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pokemonData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{pokemonDetails && pokemonDetails.name}</Text>
            {pokemonDetails && (
              <>
                <Text>Level: {pokemonDetails.base_experience}</Text>
                <Text>HP: {pokemonDetails.stats[0].base_stat}</Text>
                <Text>Attack: {pokemonDetails.stats[1].base_stat}</Text>
                <Text>Defense: {pokemonDetails.stats[2].base_stat}</Text>
                <Text>Special Attack: {pokemonDetails.stats[3].base_stat}</Text>
                <Text>Special Defense: {pokemonDetails.stats[4].base_stat}</Text>
                <Text>Speed: {pokemonDetails.stats[5].base_stat}</Text>
              </>
            )}
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>CATCH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 300,
    marginVertical: 20,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
