import React from 'react';
import Header from '../Components/Header/Header';
import SignUpSignIn from '../Components/SignUpSignIn/SignUpSignIn';


const Signup = () => {
  return (
    <div>
        <Header/>
        <div className='wrapper'>
            <SignUpSignIn/>
        </div>
    </div>
    
  )
}

export default Signup