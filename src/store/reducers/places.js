import {SET_PLACES, REMOVE_PLACE, ADD_PLACE} from "../actions/actionTypes";


const initialState = {
    places: [
        {
            key: '213123',
            name: 'First Item',
            image: {
                uri: "https://www.stylecraze.com/wp-content/uploads/2013/06/1752-Top-10-Most-Beautiful-Yellow-Roses-is.jpg"
            },
            location: {
                latitude: 37.7900352,
                longitude: -122.4013726,
            }
        },
        {
            key: '21312323',
            name: 'Second Item',
            image: {
                uri: "https://www.stylecraze.com/wp-content/uploads/2013/06/1752-Top-10-Most-Beautiful-Yellow-Roses-is.jpg"
            },
            location: {
                latitude: 37.7900352,
                longitude: -122.4013726,
            }
        }
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            };
        case ADD_PLACE:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;
