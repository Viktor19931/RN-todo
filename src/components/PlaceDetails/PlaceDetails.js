import React from 'react';
import { View, Text, StyleSheet, Modal, Image, Button, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const PlaceDetails = ({ selectedPlace, onItemDeleted, onModalClosed }) => {
    let modalContent = null;

    if (selectedPlace) {
        modalContent = (
           <View>
               <Image source={selectedPlace.image} style={styles.imageStyle}/>
               <Text style={styles.placeName}>{selectedPlace.name}</Text>
           </View>
        );
    }

    return (
        <Modal
            visible={selectedPlace !== null}
            animationType="fade"
            onRequestClose={onModalClosed}
            >
            <View style={styles.modalContainer}>
                {modalContent}
                <View style={styles.btnsContainer}>
                    <View>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center'}} onPress={onItemDeleted}>
                            <Icon size={30} name="ios-trash" color="red"/>
                            <Text style={{marginLeft: 5, color: 'red', fontSize: 18}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Button
                            title="Close"
                            color="green"
                            onPress={onModalClosed}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        padding: 20,
        paddingTop: 40,
    },
    imageStyle: {
        height: 200,
        width: '100%',
        paddingTop: 15
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

export default PlaceDetails;
