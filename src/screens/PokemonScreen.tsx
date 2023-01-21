import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParams } from '../navigator/Tab1';
// import { styles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ({navigation, route  }: Props ) => {
  
    const {simplePokemon, color} = route.params;
    const {id, name, picture} = simplePokemon;

    const {top} = useSafeAreaInsets()

    const {isLoading, pokemon} = usePokemon(id)
    // console.log(pokemon);
    
  return (

    <View style={{flex:1}} >
      {/* Header Container */}
      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>

        <TouchableOpacity
          onPress={ () => navigation.pop() }
          activeOpacity={0.8}
          style={{
            ...styles.backBotton,
            top:top+5
          }}
        >
          <Icon 
            name="arrow-back"
            color='white'
            size={35}
          
          />

        </TouchableOpacity>


        {/* Nombre del pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top+40
          }}
        >
          {name + '\n' } #{id}
        </Text>

        {/* Pokebola blanca */}
        
        <Image 
          source={require('../assets/pokebola-blanca.png')}
          style={{
            ...styles.pokeball
          }}
          
        />
                  
        <FadeInImage 
          uri={picture}
          style={styles.pokemonImage}
        />  

      </View>

      {/* DETALLES Y LOADING */}

      {
        isLoading ?
          <View style={  styles.loadingIndicator}>
            <ActivityIndicator 
              color={color}
              size={50}
            />
          </View>

        :
         <PokemonDetails pokemon={pokemon} ></PokemonDetails>

      }
      

    </View>

  )
}

const styles = StyleSheet.create({
  headerContainer:{
    height:370,
    zIndex: 999,
    alignItems:'center',
    borderBottomRightRadius:1000,
    borderBottomLeftRadius: 1000
  },
  backBotton: {
    position:'absolute',
    left:20,
  },
  pokemonName:{
    color:'white',
    fontSize:40,
    alignSelf:'flex-start',
    left:20,

  },
  pokeball:{
    width:250,
    height:250,
    bottom:-20,
    opacity:0.6,
  },
  pokemonImage:{
    width:250,
    height:250,
    position:'absolute',
    bottom:-20
  },
  loadingIndicator: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})