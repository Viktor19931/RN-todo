import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from "../ListItem/ListItem";

const PlaceList = ({ places, onItemSelected }) => {

    return (
        <FlatList
            style={styles.container}
            data={places}
            renderItem={({ item }) => (
                <ListItem
                    placeName={item.name}
                    placeImage={item.image}
                    onItemPressed={() => onItemSelected(item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
});

export default PlaceList;
