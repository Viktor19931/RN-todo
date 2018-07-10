import { ADD_PLACE, DELETE_PLACE, DESELECT_PLACE, SELECT_PLACE } from "../actions/actionTypes";


const initialState = {
    places: [
        {
            key: '213123',
            name: 'First Item',
            image: {
                uri: "https://www.stylecraze.com/wp-content/uploads/2013/06/1752-Top-10-Most-Beautiful-Yellow-Roses-is.jpg"
            }
        },
        {
            key: '21312323',
            name: 'Second Item',
            image: {
                uri: "https://www.stylecraze.com/wp-content/uploads/2013/06/1752-Top-10-Most-Beautiful-Yellow-Roses-is.jpg"
            }
        }
    ],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                        key: new Date().getTime().toString(),
                        name: action.payload,
                        image: {
                            uri: "https://www.stylecraze.com/wp-content/uploads/2013/06/1752-Top-10-Most-Beautiful-Yellow-Roses-is.jpg"
                        }
                    })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(el => {
                    return el.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.payload;
                })
            };
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer;
