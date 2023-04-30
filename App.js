import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Image, Overlay } from 'react-native-elements';
import axios from 'axios';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getPokemonList = async () => {
    const result = await axios.get(
      'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    );
    setPokemonList(result.data.pokemon);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePokemonSelection(item)}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <Image
            style={styles.image}
            source={{ uri: item.img }}
            resizeMode="contain"
          />
          <Text h4>{item.name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const handlePokemonSelection = (pokemon) => {
    setSelectedPokemon(pokemon);
    toggleOverlay();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.num}
        numColumns={2}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <View style={styles.pokemonDetails}>
          <Image
            style={styles.pokemonImage}
            source={{ uri: selectedPokemon.img }}
            resizeMode="contain"
          />
          <Text h3>{selectedPokemon.name}</Text>
          <Text>Type: {selectedPokemon.type.join(', ')}</Text>
          <Text>Height: {selectedPokemon.height}</Text>
          <Text>Weight: {selectedPokemon.weight}</Text>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
  },
  overlay: {
    borderRadius: 10,
    padding: 10,
  },
  pokemonDetails: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pokemonImage: {
    height: 200,
    width: 200,
  },
});