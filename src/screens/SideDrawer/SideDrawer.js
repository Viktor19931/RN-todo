import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class SideDrawer extends Component {
    render() {

        const signOut = () => {
            this.props.navigator({
                screen: "App.AuthScreen"
            });
        };
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon
                            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                            size={30}
                            color="#bbb"
                            style={styles.drawerItemIcon}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#fff",
        width: Dimensions.get("window").width * 0.8,
    },
    drawerItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

export default SideDrawer;
