import * as actionTypes from './actionsTypes';
import firebase from '../../config/fbConfig';


export function fetchBusinessData(userId){
  console.log(userId);

  let docRef = firebase.firestore().collection("Users").doc(userId);
  docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



	// const userRef = db.User('Users');
 //  return dispatch => {
 //    dispatch(fetchBusinessDataBegin());
 //    return userRef.doc(userId)
 //      .then(resp => {
 //        dispatch(fetchBusinessDataSuccess(resp));
 //        return resp;
 //      })
 //      .catch(error => dispatch(fetchBusinessDataError(error)));
 //  };
}


export const fetchBusinessDataBegin = () => ({
  type: actionTypes.FETCH_BUSINESSDATA_BEGIN
});

export const fetchBusinessDataSuccess = userBusinesses => ({
  type: actionTypes.FETCH_BUSINESSDATA_SUCCESS,
  userBusinesses: { userBusinesses }
});

export const fetchBusinessDataError = error => ({
  type: actionTypes.FETCH_BUSINESSDATA_FAILURE,
  payload: { error }
});
