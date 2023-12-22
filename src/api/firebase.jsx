import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import {get,set,getDatabase,ref,remove} from 'firebase/database';
import { func, object } from "prop-types";
import {v4 as uuid} from 'uuid';

const firebaseConfig={
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL
}
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database =getDatabase(app);

export async function googleLogin(){
    try{
        const result = await signInWithPopup(auth,provider);
        const user=result.user;

        return user;
    }catch(error){
        console.error(error);
    }
}
export async function googleLogOut(){
    try{
        await signOut(auth);
    }catch(error){
        console.error(error);
    }
}

export function onUserState(callback){
    onAuthStateChanged(auth,async(user)=>{
        if(user){
            try{
                const updateUser = await adminUser(user);
                callback(updateUser);
            }catch(error){
                console.error(error);
            }
        }else{
            callback(null);
        }
    })
}

async function adminUser(user){
    try{
        const snapshot = await get(ref(database,'admin'));
        if(snapshot.exists()){
            const admins=snapshot.val();
            const isAdmin=admins.includes(user.email);

            return {...user.isAdmin};
        }
        return user;
    }catch(error){
        console.error(error);
    }
}