import React, { useEffect } from 'react'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FadeInImage } from './FadeInImage';
import { useState, useRef } from 'react';
import ImageColors from 'react-native-image-colors'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Tab1';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


interface Props {
    pokemon: SimplePokemon;
}

type PokemonCardNavigationProp = StackNavigationProp<RootStackParams, 'PokemonScreen'> 

export const PokemonCard = ({pokemon}: Props) => {

    const [bgColor, setBgColor] = useState('grey')
    const navigation = useNavigation<PokemonCardNavigationProp>(); 

    const isMounted = useRef(true);

    useEffect(() => {

        ImageColors.getColors(pokemon.picture,{fallback:'grey'})
        .then(colors => {

            if(!isMounted)return;
            (colors.platform === "android")
             ? setBgColor( colors.dominant || 'grey')
             : setBgColor( colors.platform || 'grey' )//TODO: ta mal el color para IOS :v
            
        })


        //el return se dispara cuando el compoenete se desmonta
        return () => {
            isMounted.current = false
        }
      
    }, [])
    


  return (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={ 
            () => navigation.navigate('PokemonScreen', { 
                simplePokemon: pokemon, 
                color: bgColor
            } ) 
        }
    >
        <View
            style={{
                ...styles.cardContainer,
                width:windowWidth*0.4,
                backgroundColor:bgColor
            }}
        >

            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {"\n#" + pokemon.id}
                </Text>
            </View>

            <View style={styles.pokeContainer}>
                <Image 
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokebola}
                />
            </View>
            <FadeInImage 
                uri={pokemon.picture}
                style={styles.pokeImage}
            
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height:120,
        width: 160,
        marginBottom: 25,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        
    },
    name:{
        color:'white',
        fontSize: 20,
        fontWeight:'bold',
        top:20,
        left:10,
    },
    pokebola:{
        width:100,
        height:100,
        position:'absolute',     
        right:-25,
        bottom:-25,
    },

    pokeImage:{
        width:120,
        height:120,
        position:'absolute',
        right:-8,
        bottom:-5,

    },
    pokeContainer:{
        
        width:100,
        height:100,
        position: 'absolute',
        bottom:0,
        right:0,
        overflow:'hidden',
        opacity:0.4,
        // right:-20,
    }

})
// <FadeInImage 
// uri={item.picture}
// style={{
//   width:100,
//   height:100
// }}

// />


