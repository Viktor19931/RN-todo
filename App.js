import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import placeImage from './src/assets/beautiful-place.jpg';
import PlaceDetails from "./src/components/PlaceDetails/PlaceDetails";
import { addPlace, selectPlace, deletePlace, deselectPlace } from './src/store/actions/index';

class App extends React.Component {
    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = key => {
        this.props.onSelectPlace(key);
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace();
    };

    modalClosedHandler = () => {
        this.props.onDeselectPlace();
    };

    render() {
        return (
          <View style={styles.container}>
              <PlaceDetails
                  selectedPlace={this.props.selectedPlace}
                  onModalClosed={this.modalClosedHandler.bind(this)}
                  onItemDeleted={this.placeDeletedHandler.bind(this)}
              />
              <PlaceInput onPlaceAdded={this.placeAddedHandler} />
              <PlaceList
                  places={this.props.places}
                  onItemSelected={this.placeSelectedHandler}
              />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    placeButton: {
        nwidth: '30%'
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onDeletePlace: () => dispatch(deletePlace()),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: () => dispatch(deselectPlace())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
