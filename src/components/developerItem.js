import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function DeveloperItem({ navigation, developer }) {

    console.log('OlA JULIANI ' ,developer);

    return (
        <Marker coordinate={{ latitude: developer.location.coordinates[1], longitude: developer.location.coordinates[0]}}>
            <Image style={styles.avatar} source={{ uri: developer.avatar_url }} />
            
            <Callout onPress={() => {
                // navigation
                navigation.navigate('Profile', { github_username: developer.github_username })
            }}>
                <View style={styles.callout}>
                    <Text style={styles.developerName}>{developer.name}</Text> 
                    <Text style={styles.developerBio}>{developer.bio}</Text>
                    <Text style={styles.developerTechs}>{developer.techs.join(', ')}</Text>
                </View>
            </Callout>
        </Marker>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout: {
        width: 260,
    },

    developerName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    developerBio: {
        color: '#666',
        marginTop: 5
    },

    developerTechs: {
        marginTop: 5
    }
});


export default DeveloperItem;