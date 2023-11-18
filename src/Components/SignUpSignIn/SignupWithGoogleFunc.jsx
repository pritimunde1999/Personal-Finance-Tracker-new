
import { db,auth,provider } from '../../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'


    
    
    
    async function createDoc(user,setLoding) {
        if (!user) return;
        setLoding(true)
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(userRef, {
                    name: user.displayName ,
                    email:user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date()
                })
                setLoding(false)
                toast.success("Doc created")

            }
            catch (err) {
                setLoding("false")
                toast.error(err.message);
            }
        }
    }


   export function signupWithGoogle(navigate,setLoding) {
        setLoding(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                createDoc(user,setLoding);
                setLoding(false)
                navigate("/dashboard");
                toast.success("signin done")
             
            }).catch((error) => {
                // Handle Errors here.
                
                const errorCode = error.code;
                const errorMessage = error.message;
               
                setLoding(false)
                toast.error(errorMessage)
                
            });
    }

  


