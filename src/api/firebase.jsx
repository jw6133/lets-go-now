import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import {get,set,getDatabase,ref,remove} from 'firebase/database';

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
var uid='';

provider.setCustomParameters({
    prompt : 'select_account'
}) //자동로그인방지
export async function googleLogin(){
    try{
        const result = await signInWithPopup(auth,provider);
        const user=result.user;
        uid=result.user.uid;
        console.log(uid);
        return user;
    }catch(error){
        console.error(error);
    }
}
export async function googleLogOut(){
    try{
        uid='';
        await signOut(auth);
    }catch(error){
        console.error(error);
    }
}
//로그인 유지
export function onUserState(callback){
    onAuthStateChanged(auth,async(user)=>{
        if(user){
            try{
                const updateUser = await adminUser(user);
                uid=updateUser.uid;
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
            return {...user,isAdmin};
        }
        return user;
    }catch(error){
        console.error(error);
    }
}

export async function saveSubway(station){
    return set(ref(database,`subways/${uid}`),{
        station,
        uid,
    })
}

export async function getDBSubway(){
    try{
        const snapshot = await get(ref(database,`subways/${uid}`));
        if(snapshot.exists()){
            return(snapshot.val().station);
        }
    }
    catch(error){
        console.error(error);
    }
}

export async function saveBus(busName,station){
    return set(ref(database,`bus/${uid}`),{
        busName,
        station,
        uid,
    })
}

export async function getDBBus(){
    try{
        const snapshot = await get(ref(database,`bus/${uid}`));
        if(snapshot.exists()){
            return [snapshot.val().busName,snapshot.val().station];
        }
    }catch(error){
        console.error(error);
    }
}