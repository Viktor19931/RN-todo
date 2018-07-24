import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import { deletePlace } from '../../store/actions/index';
import MapView from "react-native-maps";

class PlaceDetails extends Component {
    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        const { selectedPlace } = this.props;

        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={selectedPlace.image}
                            style={styles.imageStyle}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta:
                                Dimensions.get("window").width /
                                Dimensions.get("window").height *
                                0.0122
                            }}
                            style={styles.map}
                        >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{selectedPlace.name}</Text>
                    </View>
                    <View style={styles.deleteButton}>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1
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
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    subContainer: {
        flex: 1
    },
    placeDetailContainer: {
        flex: 2
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center"
    },
    mapContainer: {
        marginTop: 10
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetails);
