import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';

class AsyngImage extends Component {
    state = {
        loaded: false
    };

    onLoad = () => {
        this.setState({loaded: true});
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    {...this.props}
                    style={[styles.image, this.props.style]}
                    onLoad={this.onLoad}
                />
                {!this.state.loaded &&
                <View
                    {...this.props}
                    style={[styles.indicator, this.props.style]}
                >
                    <ActivityIndicator
                        size={this.props.indicatorSize || 'small'}
                    />
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    image: {
        // position: 'absolute'
    },
    indicator: {
        position: 'absolute',
        width: 58,
        height: 30
    }
});

export default AsyngImage;
