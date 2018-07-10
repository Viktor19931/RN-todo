import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Image} from 'react-native';

const ListItem = ({ onItemPressed, placeImage, placeName }) => {
    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback onPress={onItemPressed}>
                <View style={styles.container}>
                    <Image
                        source={placeImage}
                        style={styles.placeImageStyle}/>
                    <Text>{placeName}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity onPress={onItemPressed}>
            <View style={styles.container}>
                <Image
                    source={placeImage}
                    style={styles.placeImageStyle}/>
                <Text>{placeName}</Text>
            </View>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeImageStyle: {
        marginRight: 8,
        width: 50,
        height: 30
    }
});

export default ListItem;
