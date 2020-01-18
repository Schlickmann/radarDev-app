import React , { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import api from '../services/api'; 
import SearchForm from '../components/searchForm';
import DeveloperItem from '../components/developerItem';

function Main({ navigation }) {
    const [developers, setDevelopers] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
                
            }
        }

        loadInitialPosition();
    }, []);


    async function loadDevelopers(techs) {
        const { latitude, longitude } = currentLocation;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevelopers(response.data);
    }

    function handleNewLocation(region) {
        setCurrentLocation(region)
    }

    if (!currentLocation) {
        return null;
    }

    return (
        
        <>
            <MapView onRegionChangeComplete={handleNewLocation} initialRegion={currentLocation} style={styles.map}>
                
                {developers.map(developer => (
                    <DeveloperItem key={developer._id} developer={developer} navigation={navigation} />
                ))}
                
            </MapView>
            <SearchForm loadDevelopers={loadDevelopers} />
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});

export default Main;