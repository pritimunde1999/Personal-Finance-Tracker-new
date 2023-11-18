import React,{useState} from 'react'
import Input from '../Input/Input'
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { signupWithGoogle } from './SignupWithGoogleFunc';

const LoginForm = ({setSignupForm}) => {

    const [user, setuser] = useState({email: '', password: ''});
    const [loading,setLoding] = useState(false);
    const navigate = useNavigate();

  function loginWithEmail(e) {
    e.preventDefault();
    console.log(user)
    setLoding(true);
  
    const email = user.email;
    const password = user.password;
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    setuser({email:'',password:''})
   
    toast.success("Login Successfully!");
    setLoding(false)
    navigate("/dashboard")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
    toast.error(errorMessage)
    setLoding(false)
  });
    

  }

    return (
        <div>
            <h2 className='title'>
            LogIn on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form onSubmit={loginWithEmail}>
            
            <Input type={"email"} label={"Email"} placeholder={"johnDoe@gmail.com"} name={"email"} value={user.email} user={user} setUser={setuser} />
            <Input type={"password"} label={"Password"} placeholder={"Example@123"} name={"password"} value={user.password} user={user} setUser={setuser} />
          
    
            <Button type='submit' disabled={loading} style={{ width: '100%', marginTop: '1rem', color: "var(--theme)", borderColor: "var(--theme)" }} variant="outlined">
              {
                loading ? "Loding..." : "Login with Email"
              }
              </Button>
            <p style={{ textAlign: 'center', margin: '1rem' }}>OR</p>
            <Button onClick={()=>signupWithGoogle(navigate,setLoding)} disabled={loading} style={{ width: '100%', backgroundColor: 'var(--theme)' }} variant='contained'>
            {
                loading ? "Loding..." : "Login with google"
            } 
            </Button>
            <p className='bottom' onClick={()=>setSignupForm(true)}>Or Don't Have an Account? Click Here</p>
          </form>
        </div>
      )
}

export default LoginForm