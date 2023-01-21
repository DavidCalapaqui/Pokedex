import React from 'react'
import { View, StyleSheet, Text, Platform, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';


interface Props {
    onDebounce: (value:string) => void; 
    style?: StyleProp<ViewStyle> 
}


export const SearchInput = ( {style, onDebounce}: Props ) => {

    const [textValue, setTextValue] = useState("")

    const debouncedValue =  useDebouncedValue(textValue)
    
    useEffect(() => {
        onDebounce(debouncedValue)
    }, [debouncedValue])
    

  return (
    <View style={{
            ...styles.container,
            ...style as any
        }}>
        <View style={styles.textBackground}> 
            <TextInput
                placeholder='Buscar Pokemón'
                style={{
                    ...styles.textInput,
                    top: (Platform.OS==='ios'?0:2)
                }}
                autoCapitalize="none"
                autoCorrect={false}
                value={textValue}
                onChangeText={setTextValue}
            />
            <Icon 
                name='search'
                color='grey'
                size={30}
            />
        </View>


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red'
    },
    textBackground:{
        backgroundColor:'#F3F3F3',
        borderRadius:50,
        height:40,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    textInput:{
        flex:1,
        fontSize:18,
        top: 2
    }
})
