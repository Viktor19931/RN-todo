import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Button from "../UI/Button/Button";
import imagePlaceholder from "../../assets/beautiful-place.jpg";


class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholderStyle}>
                    <Image source={imagePlaceholder} style={styles.previewImage}/>
                </View>
                <View style={styles.buttonStyle}>
                    <Button onPress={() => alert('image picked')}>Pick Image</Button>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholderStyle: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    buttonStyle: {
        margin: 8
    },
    previewImage: {
        height: '100%',
        width: '100%'
    }
});

export default PickImage;
