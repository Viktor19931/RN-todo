import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/StartMainTab'
import { AUTH_SET_TOKEN } from './actionTypes';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let apiKey = "AIzaSyBji7T71j-E3grXhFRQlGQnz2eSU6EF3aE";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
        if (authMode === 'signup') {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (parsedRes.error) {
                alert("Authentication failed, please try again !")
            } else {
                startMainTabs();
                dispatch(authSetToken(parsedRes.idToken));
            }
        })
        .catch(err => {
            dispatch(uiStopLoading());
            console.log(err);
        })
    };
};

export const authSetToken = token => {
      return {
          type: AUTH_SET_TOKEN,
          token: token
      }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};
