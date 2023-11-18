import React, { useState } from 'react'
import Input from '../Input/Input'
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signupWithGoogle } from './SignupWithGoogleFunc';



const SignUpForm = ({ setSignupForm }) => {

    const [user, setuser] = useState({ name: "", email: '', password: '', cpassword: '' });
    const { name, email, password, cpassword } = user;
    const [loading, setLoding] = useState(false);
    const navigate = useNavigate();

     function signupWithEmail(e) {
        e.preventDefault();
        setLoding(true);

        if (password === cpassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    toast.success("User Created!");
                    createDoc(user);
                    setuser({ name: '', email: '', password: '', cpassword: '' })
                    setLoding(false);
                    navigate("/dashboard")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoding(false)
                });
        }
        else {
            toast.error("Password and confirm password doesn't matched!");
            setLoding(false)
        }
    }

     async function createDoc(user) {
        if (!user) return;
        setLoding(true)
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(userRef, {
                    name: user.displayName ? user.displayName : name,
                    email,
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


    
    

    return (
        <div>
            <h2 className='title'>
                Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
            </h2>
            <form onSubmit={signupWithEmail}>
                <Input type={"text"} label={"Full Name"} placeholder={"John Doe"} name={"name"} value={user.name} user={user} setUser={setuser} />
                <Input type={"email"} label={"Email"} placeholder={"johnDoe@gmail.com"} name={"email"} value={user.email} user={user} setUser={setuser} />
                <Input type={"password"} label={"Password"} placeholder={"Example@123"} name={"password"} value={user.password} user={user} setUser={setuser} />
                <Input type={"password"} label={"Confirm Password"} placeholder={"Example@123"} name={"cpassword"} value={user.cpassword} user={user} setUser={setuser} />

                <Button type='submit' disabled={loading} style={{ width: '100%', marginTop: '1rem', color: "var(--theme)", borderColor: "var(--theme)" }} variant="outlined">
                    {
                        loading ? "Loding..." : "SignUp with Email"
                    }
                </Button>
                <p style={{ textAlign: 'center', margin: '1rem' }}>OR</p>
                <Button onClick={()=>signupWithGoogle(navigate,setLoding)} disabled={loading} style={{ width: '100%', backgroundColor: 'var(--theme)' }} variant='contained'>
                    {
                        loading ? "Loding..." : "SignUp with google"
                    }
                </Button>
                <p className='bottom' onClick={() => setSignupForm(false)}>Or Have an Account Already? Click Here</p>
            </form>
        </div>
    )
}

export default SignUpForm