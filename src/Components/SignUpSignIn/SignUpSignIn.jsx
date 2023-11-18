import React, { useState } from 'react'
import "./SignUpSignIn.css"
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


const SignUpSignIn = () => {

  const [signupForm,setSignupForm] = useState(true);

  function createDoc(user){

  }

  return (
    <div className='signup-wrapper'>
  
      {
        signupForm ? <SignUpForm setSignupForm={setSignupForm} /> : <LoginForm setSignupForm={setSignupForm}/>
      }
    </div>

  )
}

export default SignUpSignIn