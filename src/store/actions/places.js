import { SET_PLACES, REMOVE_PLACE, ADD_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-auth-react-cbf3e.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(e => {
            console.log(e);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            console.log(parsedRes.imageUrl);
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            console.log(placeData);
            return fetch("https://auth-react-cbf3e.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong !');
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
            dispatch(getPlaces());
        })
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://auth-react-cbf3e.firebaseio.com/places.json?auth=" + token)
            })
            .catch(() => alert('No valid token found'))
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    });
                }
                dispatch(setPlaces(places))
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong !');
            });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const addPlaceLocal = place => {
    console.log(place);
    return {
        type: ADD_PLACE,
        place: place
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                dispatch(removePlace(key));
                return fetch("https://auth-react-cbf3e.firebaseio.com/places/" + key + ".json?auth=" + token, {
                    method: "DELETE"
                })
            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};
