import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1,  } from './Tab1';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();



export const Tabs = () =>  {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor:'white',
            
        }}
        screenOptions={{
            tabBarActiveTintColor: '#5856D6',
           
            tabBarLabelStyle:{
                marginBottom: (Platform.OS==="ios")?0:10,
            },

            tabBarStyle:{
                position:'absolute',
                borderWidth:0,
                backgroundColor:'rgba(255,255,255,0.6)',
                elevation:0,
                height:(Platform.OS==="ios")? 80 : 60,
            }
        }}
    
    >
      <Tab.Screen 
            name="HomeScreen" 
            component={Tab1} 
            
            options={{
                headerShown: false,
                tabBarLabel:'Listado',
                tabBarIcon: ({color}) => <Icon  
                    name='format-list-bulleted' 
                    color={color} 
                    size={30} 
                    
                />
                
            }}

        />
      <Tab.Screen 
        name="SearchScreen" 
        component={Tab2Screen} 
        options={{
            tabBarLabel:'Busqueda',
            headerShown: false,
            tabBarIcon: ({color}) => <Icon  
                name='search' 
                color={color} 
                size={30} 
                
            />
        }}
       />
    </Tab.Navigator>
  );
}