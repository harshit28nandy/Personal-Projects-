import { provider, storage, db} from "../firebase";
import { SET_USER } from "./actionType";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import "firebase/storage";


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

const auth = getAuth();

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(payload);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = payload.user;
                // ...
            }).catch((error) => alert(error.message));
 
    };
}

export function getUserAuth() {
    return(dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUser(user))
            }
        });
    };
}

export function signOutAPI(){
    return(dispatch) => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
        }).catch((error) => alert(error.message));
    }
}


export function postArticleAPI(payload){
    return(dispatch) => {
        if(payload.image !== '') {
            const upload = storage
            .ref(`images/${payload.image.name}`)
            .put(payload.image);
            upload.on('state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
                console.log(`Progress: ${progress}%`);

                if(snapshot.change === "RUNNING"){
                    console.log(`Progress: ${progress}%`);
                }
            }, error => console.log(error.code),
            async() => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                db.collection('articles').add({
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comment: 0,
                    description: payload.description
                })
            });
        }
    }
}


{/*import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

signInWithPopup(auth, provider)
  .then((payload) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(payload);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = payload.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }); 

auth
            .signInWithPopup( auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => alert(error.message));*/}