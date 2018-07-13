import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import { deletePlace } from '../../store/actions/index';

class PlaceDetails extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        const { selectedPlace } = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <Image source={selectedPlace.image} style={styles.imageStyle}/>
                    <Text style={styles.placeName}>{selectedPlace.name}</Text>
                </View>
                <View style={styles.btnsContainer}>
                    <View>
                        <TouchableOpacity
                            style={{alignItems: 'center', alignContent: 'center'}}
                            onPress={this.placeDeletedHandler}>
                            <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red"/>
                            <Text style={{marginLeft: 5, color: 'red', fontSize: 18}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    modalContainer: {
        padding: 20,
        paddingTop: 40,
    },
    imageStyle: {
        height: 200,
        width: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        margin: 10
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetails);
