import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Image, ActivityIndicator} from 'react-native';

import AsyncImage from "../AsyncImage/AsyngImage";

class ListItem extends Component {
    state = {
        loaded: false
    };

    onLoad = () => {
        this.setState(() => ({ loaded: true }))
    };

    render(){
    const { onItemPressed, placeImage, placeName } = this.props;

        if (Platform.OS === "android") {
            return (
                <TouchableNativeFeedback onPress={onItemPressed}>
                    <View style={styles.container}>
                        <AsyncImage
                            source={placeImage}
                            style={styles.placeImageStyle}
                        />
                        <Text>{placeName}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return (
            <TouchableOpacity onPress={onItemPressed}>
                <View style={styles.container}>
                    <AsyncImage
                        source={placeImage}
                        style={styles.placeImageStyle}
                    />
                    <Text>{placeName}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        paddingLeft: 10,
        backgroundColor: '#eee',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeImageStyle: {
        marginRight: 8,
        width: 50,
        height: 30,
        justifyContent: 'center',
    }
});

export default ListItem;
