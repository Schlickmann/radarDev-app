import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function SearchForm({ loadDevelopers }) {
    const [techs, setTechs] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(20));

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardWillShow);
        Keyboard.addListener('keyboardDidHide', keyboardWillHide);

         // returned function will be called on component unmount 
        return () => {
            Keyboard.removeAllListeners()
        }
    }, []);

    function keyboardWillShow (event) {
        Animated.parallel([
          Animated.timing(keyboardHeight, {
            duration: 150,
            toValue: event.endCoordinates.height + 20,
          })
        ]).start();
      };


      function keyboardWillHide (event) {
        Animated.parallel([
          Animated.timing(keyboardHeight, {
            duration: 200,
            toValue: 20,
          })
        ]).start();
      };
    
    
      function searchDevelopers() {
        loadDevelopers(techs);

        setTechs('');
      }



    return (
        
        <Animated.View style={ [styles.searchForm, { bottom: keyboardHeight }] }>
            <TextInput
                onSubmitEditing={Keyboard.dismiss}
                style={styles.searchInput} 
                placeholder='Search developers by technologies...'
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity
                onPress={searchDevelopers}
                style={styles.searchButton}
            >
                <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default SearchForm;